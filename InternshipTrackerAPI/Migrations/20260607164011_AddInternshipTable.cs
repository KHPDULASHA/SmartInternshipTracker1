using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InternshipTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddInternshipTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Company",
                table: "Internships");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Internships");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "Internships");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Internships");

            migrationBuilder.RenameColumn(
                name: "Role",
                table: "Users",
                newName: "PasswordHash");

            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "Users",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Internships",
                newName: "InternshipId");

            migrationBuilder.AddColumn<DateTime>(
                name: "AppliedDate",
                table: "Internships",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CompanyName",
                table: "Internships",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "Deadline",
                table: "Internships",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "JobLink",
                table: "Internships",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Internships",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Internships",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Internships",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AppliedDate",
                table: "Internships");

            migrationBuilder.DropColumn(
                name: "CompanyName",
                table: "Internships");

            migrationBuilder.DropColumn(
                name: "Deadline",
                table: "Internships");

            migrationBuilder.DropColumn(
                name: "JobLink",
                table: "Internships");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Internships");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "Internships");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Internships");

            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "Users",
                newName: "Role");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Users",
                newName: "FullName");

            migrationBuilder.RenameColumn(
                name: "InternshipId",
                table: "Internships",
                newName: "Id");

            migrationBuilder.AddColumn<string>(
                name: "Company",
                table: "Internships",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Internships",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Internships",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Internships",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
