import { ICourse } from "./iCourse";

export class Course implements ICourse {
    courseId: number;
    courseName: string;
    courseCode: string;
    releaseDate: string;
    weight: number;
    description: string;
    content: string[];
    starRating: number;
    imageUrl: string;

    constructor(courseId: number, courseName: string, courseCode: string, releaseDate: string, weight: number, description: string, content: string[], starRating: number, imageUrl: string) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.courseCode = courseCode;
        this.releaseDate = releaseDate;
        this.weight = weight;
        this.description = description;
        this.content = content;
        this.starRating = starRating;
        this.imageUrl = imageUrl;
    }

    displayCourse(): string {
        return `${this.courseName} : code ${this.courseCode}`
    }

    
}