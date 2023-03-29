import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Location } from './location.interface';
import { CafeModel } from '../cafe/cafe.interface';
import {
  computeDestinationPoint,
  getCenter,
  getGreatCircleBearing,
  isPointWithinRadius
} from 'geolib';

const RADIUS = 500;    // Start of w/ 500m radius
const INCREMENT = 1000; // Increment distance by 1km
const MAX_TRIES = 7;    // Max no. of retrievals
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

  async retrieveNearbyCafes(midpoint: Location, allCafe: CafeModel[]): Promise<{ cafes: CafeModel[], radius: number, midpoint: Location }> {
    let radius = RADIUS;
    let cafesFound = [];
    let currMidPoint = midpoint;

    for (let i = 0; i < MAX_TRIES; i++) {
      const newCafes = await this.getAllCafesInRadius(allCafe, currMidPoint, radius);
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
      const bearing = getGreatCircleBearing(currMidPoint, CBD);
      currMidPoint = computeDestinationPoint(currMidPoint, INCREMENT, bearing);
    }
    return {
      cafes: cafesFound,
      radius: radius,
      midpoint: currMidPoint,
    };
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

  private static isValidLocation(loc: false | Location) {
    if (loc == false) {
      return false;
    }
    return !(isNaN(loc.latitude) || isNaN(loc.longitude));
  }
}
