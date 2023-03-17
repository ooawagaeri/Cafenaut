import { Injectable } from '@nestjs/common';
import { Location } from './location.interface';
import { CafeModel } from '../cafe/cafe.interface';
import {
  computeDestinationPoint,
  getCenter,
  getGreatCircleBearing,
  isPointWithinRadius
} from 'geolib';

const RADIUS = 1500;    // Start of w/ 1.5km radius
const INCREMENT = 1000; // Increment radius by 1km
const MAX_TRIES = 5;    // Max no. of retrievals
const MIX_LOCS = 3;     // Min no. of loc found

// Maxwell Food Centre
const CBD = {
  latitude: 1.2805134083679626,
  longitude: 103.8447570537589
}

@Injectable()
export class MiddleGroundService {
  calculateCenter(locations: Location[]): Location {
    const res = getCenter(locations)
    if (res) {
      return res as Location;
    }
    return {
      latitude: -1,
      longitude: -1,
    }
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
      radius += INCREMENT;
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
}
