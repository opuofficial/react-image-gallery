# React Image Gallery

## About

This is a responsive image gallery created using React JS. It provides a range of features, including reordering, deleting multiple images, and setting a feature image.

## Live Demo

[View the live demo](https://image-gallery-task-react.netlify.app/)

## Features

- Grid layout for the image gallery.
- Reordering functionality: Rearrange the order of images.
- Deleting multiple images: Select multiple images for deletion.
- Setting a feature image by sorting.
- Smooth and responsive user experience.
- Snackbar Notification: When you delete multiple images, a snackbar notification will appear. It displays the number of images that have been deleted.
- Undo Feature: The snackbar notification includes an "Undo" button. Clicking this button within a certain amount of time will restore the deleted images.

## Technologies Used

- React JS
- dnd-kit Library (for drag-and-drop functionality)


## Installation

To run this project locally, you need to have Node.js and npm (Node Package Manager) installed on your machine. If you don't have them, you can download and install them from [Node.js official website](https://nodejs.org/).

Once you have Node.js and npm installed, follow these steps:

1. Clone this repository to your local machine:
   ```bash
    git clone https://github.com/opuofficial/react-image-gallery.git
2. Navigate to the project's directory:
   ```bash 
    cd react-image-gallery
3. Install the project's dependencies:
   ```bash
    npm install
4. Start the development server:
   ```bash
    npm run dev