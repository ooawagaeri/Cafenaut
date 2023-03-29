import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Location } from './location.interface';
import { CafeModel } from '../cafe/cafe.interface';
import {
  computeDestinationPoint,
  getCenter,
  getGreatCircleBearing,
  isPointWithinRadius
} from 'geolib';

const RADIUS = 1000;    // Start of w/ 1km radius
const INCREMENT = 2000; // Increment radius by 2km
const MAX_TRIES = 5;    // Max no. of retrievals
const MIX_LOCS = 2;     // Min no. of loc found

// Maxwell Food Centre
const CBD = {
  latitude: 1.2805134083679626,
  longitude: 103.8447570537589
}

@Injectable()
export class MiddleGroundService {
  calculateCenter(locations: Location[]): Location {
    const res = getCenter(locations)
    if (MiddleGroundService.isValidLocation(res)) {
      return res as Location;
    }
    console.log('Invalid location(s)!');
    throw new HttpException('Invalid location(s)!', HttpStatus.BAD_REQUEST);
  }

  async retrieveNearbyCafes(midPoint: Location, allCafe: CafeModel[]): Promise<CafeModel[]> {
    let radius = RADIUS;
    let cafesFound = []

    for (let i = 0; i < MAX_TRIES; i++) {
      const newCafes = await this.getAllCafesInRadius(allCafe, midPoint, radius);

      if (newCafes.length > cafesFound.length) {
        cafesFound = newCafes;
      }
      if (cafesFound.length >= MIX_LOCS) {
        break;
      } else if (cafesFound.length == 0 && i == MAX_TRIES - 1) {
        // Keep trying until 1 is found
        i--;
      }

      // Shift midpoint towards CBD
      radius += RADIUS;
      const bearing = getGreatCircleBearing(midPoint, CBD);
      midPoint = computeDestinationPoint(midPoint, INCREMENT, bearing);
    }
    return cafesFound;
  }

  private async getAllCafesInRadius(allCafes: CafeModel[], midPoint: Location, radius: number): Promise<CafeModel[]> {
    const cafes = [];
    allCafes.forEach((cafe) => {
      const isInRadius = isPointWithinRadius(cafe.location, midPoint, radius);
      if (isInRadius) {
        cafes.push(cafe);
      }
    });
    return cafes;
  }

  private static isValidLocation(loc:  false | Location) {
    if (loc == false) {
      return false;
    }
    return !(isNaN(loc.latitude) || isNaN(loc.longitude));
  }
}
