export class UpdateJobDto {
    readonly id: number;
    readonly name: string | undefined;
    readonly description: string | undefined;
    readonly skills: string[] | undefined;
}
