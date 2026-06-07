using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InternshipTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class SkillsModule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Skills");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "UserSkills",
                newName: "UserSkillId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Skills",
                newName: "SkillId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "InternshipSkills",
                newName: "InternshipSkillId");

            migrationBuilder.AlterColumn<string>(
                name: "ProficiencyLevel",
                table: "UserSkills",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<decimal>(
                name: "YearsOfExperience",
                table: "UserSkills",
                type: "decimal(4,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Skills",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SkillName",
                table: "Skills",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsRequired",
                table: "InternshipSkills",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_UserSkills_SkillId",
                table: "UserSkills",
                column: "SkillId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSkills_UserId",
                table: "UserSkills",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Skills_SkillName",
                table: "Skills",
                column: "SkillName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_InternshipSkills_InternshipId",
                table: "InternshipSkills",
                column: "InternshipId");

            migrationBuilder.CreateIndex(
                name: "IX_InternshipSkills_SkillId",
                table: "InternshipSkills",
                column: "SkillId");

            migrationBuilder.AddForeignKey(
                name: "FK_InternshipSkills_Internships_InternshipId",
                table: "InternshipSkills",
                column: "InternshipId",
                principalTable: "Internships",
                principalColumn: "InternshipId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InternshipSkills_Skills_SkillId",
                table: "InternshipSkills",
                column: "SkillId",
                principalTable: "Skills",
                principalColumn: "SkillId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserSkills_Skills_SkillId",
                table: "UserSkills",
                column: "SkillId",
                principalTable: "Skills",
                principalColumn: "SkillId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserSkills_Users_UserId",
                table: "UserSkills",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InternshipSkills_Internships_InternshipId",
                table: "InternshipSkills");

            migrationBuilder.DropForeignKey(
                name: "FK_InternshipSkills_Skills_SkillId",
                table: "InternshipSkills");

            migrationBuilder.DropForeignKey(
                name: "FK_UserSkills_Skills_SkillId",
                table: "UserSkills");

            migrationBuilder.DropForeignKey(
                name: "FK_UserSkills_Users_UserId",
                table: "UserSkills");

            migrationBuilder.DropIndex(
                name: "IX_UserSkills_SkillId",
                table: "UserSkills");

            migrationBuilder.DropIndex(
                name: "IX_UserSkills_UserId",
                table: "UserSkills");

            migrationBuilder.DropIndex(
                name: "IX_Skills_SkillName",
                table: "Skills");

            migrationBuilder.DropIndex(
                name: "IX_InternshipSkills_InternshipId",
                table: "InternshipSkills");

            migrationBuilder.DropIndex(
                name: "IX_InternshipSkills_SkillId",
                table: "InternshipSkills");

            migrationBuilder.DropColumn(
                name: "YearsOfExperience",
                table: "UserSkills");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "SkillName",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "IsRequired",
                table: "InternshipSkills");

            migrationBuilder.RenameColumn(
                name: "UserSkillId",
                table: "UserSkills",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "SkillId",
                table: "Skills",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "InternshipSkillId",
                table: "InternshipSkills",
                newName: "Id");

            migrationBuilder.AlterColumn<int>(
                name: "ProficiencyLevel",
                table: "UserSkills",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Skills",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
