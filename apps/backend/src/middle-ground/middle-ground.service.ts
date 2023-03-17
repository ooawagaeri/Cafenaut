import { Injectable } from "@nestjs/common";
import { Location } from "./location.interface";
import { getCenter } from "geolib"


function degToRad(deg: number): number {
  return deg * (Math.PI / 180);
}

function radToDeg(radians: number): number {
  return radians * (180 / Math.PI);
}

@Injectable()
export class MiddleGroundService {
  public calculateMidPoint(locationA: Location, locationB: Location): Location {
    const dLon = degToRad(locationB.longitude - locationA.longitude);
    const lat1 = degToRad(locationA.latitude);
    const lat2 = degToRad(locationA.latitude);
    const lon1 = degToRad(locationA.longitude);

    const Bx = Math.cos(lat2) * Math.cos(dLon);
    const By = Math.cos(lat2) * Math.sin(dLon);
    const lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By));
    const lon3 = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);

    //print out in degrees
    console.log(lat3 + " " + lon3);
    return {
      latitude: radToDeg(lat3),
      longitude: radToDeg(lon3),
    }
  }

  public calculateCenter(locationA: Location, locationB: Location): Location {
    const res = getCenter([
      locationA, locationB
    ])
    if (res) {
      return res as Location;
    }
    return {
      latitude: -1,
      longitude: -1,
    }
  }
}
