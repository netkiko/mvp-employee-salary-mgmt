This is an MVP Employee Salary Management webapp project bootstrapped with [Next.js](https://nextjs.org/).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## Steps on using the Webapp

Initially, MVP Employee Salary Management webapp will load with empty Employee List, it has sidebar with the name of the user avatar and long name. Side bar has functional links, but only Employee List and Upload Employee List have productive functionalities.

To start using the Webapp, follow the steps below:

1. Upload Employee list with CSV file format via Upload Employee List link found from the side bar menu.
2. Once clicked, it will launch Upload Employee List modal. There you have the options to upload single or multiple CSV files. It has active validation system in which error message/s (result of any validation failures) will be displayed altogether with CSV file name/s and Progress bars and error message (if there's any validation failures). The uploaded rows will automatically fill in the Employee List table.
3. For editing any of Employee Details, you only need to click the Edit (pencil) icon and it will show up the Edit Employee Details modal. User can update the Name, Login and Salary but not the Employee Id. Once updated, just click Save button and it will give you successful update notification. The updated details will immediately reflect in the Employee List table.
4. For deleting any Employee Details, it just require you to click on Delete (garbage bin) icon and it will display a confirmation dialog box. Once you press OK, it will remove the entire row in the Employee List table instantly.
5. Table has the ability to sort each column, just click on the column header of desired field (e.g. Id, Login, Name and Salary) and sort it in either ascending or descending order.
6. It also has the ability to filter Employee List via Salary Range.
7. Employee List table has also a functional page navigation. You can select number of rows to be displayed on each page.
8. Pagination, column sorting and salary range filtering are all working together in Employee List page.
