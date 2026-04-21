# Lab Record Manager

A simple, browser-based tool for students to manage their lab experiment records subject-wise. Records are saved in the browser using localStorage, so no backend or account is required.

## Features

- Add experiment records with subject name, experiment name, date, and marks or status
- View all records in a clean table, grouped and sorted by subject
- Edit or delete individual records
- Clear all records at once
- Persistent storage via localStorage — data survives page refreshes
- Toast notifications for user feedback

## Tech Stack

- HTML
- CSS
- JavaScript (vanilla, no dependencies)

## Getting Started

No installation or build step is needed.

1. Clone the repository:
   ```bash
   git clone https://github.com/Antherix/lab-record-manager.git
   ```
2. Open `index.html` in any modern web browser.

That's it. The app runs entirely in the browser.

## Usage

Fill in the form fields — Subject, Experiment Name, Date, and Marks/Status — then click **Add Record**. The entry appears in the table below. Use the action buttons in each row to edit or delete a record. The **Clear All** button removes every record at once.

## File Structure

```
lab-record-manager/
├── index.html   # App markup and layout
├── style.css    # Styling
└── script.js    # App logic and localStorage handling
```

## License

This project does not currently include a license file.
