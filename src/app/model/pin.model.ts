import { FloorPlan } from './floor-plan.model';
import { GeoCode } from './geo-code.model';

export interface Pin {
    circle?: any;
    selected?: boolean;
    city: string;
    favorite: boolean;
    floorplans: FloorPlan[];
    geocode: GeoCode;
    highValueAmenities: string[];
    highestSentCommissions: number;
    listID: number;
    management: string;
    name: string;
    onsiteManager: string;
    order: number;
    paidUtilities: string[];
    pets: boolean;
    photo: string;
    propertyID: number;
    proximity: number;
    section8: boolean;
    seniorHousing: boolean;
    state: string;
    streetAddress: string;
    studentHousting: boolean;
    washerDry: string;
}

export class PinConstructor implements Pin {
    city: string;
    favorite: boolean;
    floorplans: FloorPlan[];
    geocode: GeoCode;
    highValueAmenities: string[];
    highestSentCommissions: number;
    listID: number;
    management: string;
    name: string;
    onsiteManager: string;
    order: number;
    paidUtilities: string[];
    pets: boolean;
    photo: string;
    propertyID: number;
    proximity: number;
    section8: boolean;
    seniorHousing: boolean;
    state: string;
    streetAddress: string;
    studentHousting: boolean;
    washerDry: string;

    constructor({
        city,
        favorite,
        floorplans,
        geocode,
        highValueAmenities,
        highestSentCommissions,
        listID,
        management,
        name,
        onsiteManager,
        order,
        paidUtilities,
        pets,
        photo,
        propertyID,
        proximity,
        section8,
        seniorHousing,
        state,
        streetAddress,
        studentHousting,
        washerDry
    }) {
        this.city = city;
        this.favorite = favorite;
        this.floorplans = floorplans;
        this.geocode = geocode;
        this.highValueAmenities = highValueAmenities;
        this.highestSentCommissions = highestSentCommissions;
        this.listID = listID;
        this.management = management;
        this.name = name;
        this.onsiteManager = onsiteManager;
        this.order = order;
        this.paidUtilities = paidUtilities;
        this.pets = pets;
        this.photo = photo;
        this.propertyID = propertyID;
        this.proximity = proximity;
        this.section8 = section8;
        this.seniorHousing = seniorHousing;
        this.state = state;
        this.streetAddress = streetAddress;
        this.studentHousting = studentHousting;
        this.washerDry = washerDry;
    }
}
