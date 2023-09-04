export class CreateJobDto {
    readonly name: string;
    readonly description: string;
    readonly skills: string[];
    readonly author_id: number;
}
