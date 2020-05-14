using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UserActivityAddedfixed2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Value 101");

            migrationBuilder.UpdateData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "Value 102");

            migrationBuilder.UpdateData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 3,
                column: "Name",
                value: "Value 103");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Value101");

            migrationBuilder.UpdateData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "Value102");

            migrationBuilder.UpdateData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 3,
                column: "Name",
                value: "Value103");

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Name" },
                values: new object[] { 4, "Value104" });
        }
    }
}
