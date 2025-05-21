export interface Course {
    id: number;
    title: string;
    category: string;
    status: "Draft" | "Published" | "Archived";
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    duration: string;
    createdDate: string;
    lastUpdated: string;
    description: string;
    tags: string[];
    enrolledStudents: number;
    completionRate: number;
}
