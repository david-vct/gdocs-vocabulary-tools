# Google Docs Vocabulary Tools

Google Docs Vocabulary Tools is a versatile **Google Docs add-on** designed to enhance your writing experience by **providing quick access to synonyms, antonyms and conjugations**. This add-on is perfect for writers, students, and professionals who want to improve their vocabulary and find the right words effortlessly.

## Overview

![Image](/assets/img/vocabulary-tools-uses-flat.jpg)

- **Synonyms Finder**: Instantly find synonyms to avoid repetition and add variety to your writing
- **Antonyms Finder**: Discover antonyms to precisely express contrasting ideas
- **Conjugation Assistant**: Easily get the correct verb conjugations in different tenses
- **Language**: French

## Usage

1.  Install extension
1.  Open a document or create a new one
1.  Select any word or expression
1.  Under the _Add-ons_ menu, select _Vocabulary tools_
1.  Click _Synonyms_, _Antonyms_ or _Conjugations_

## Prerequisites

Before you install the Google Apps Script Add-on, make sure you have:

- A Google account
- [Node.js](https://nodejs.org/) installed on your machine
- `npm` (Node Package Manager) installed on your machine

## Installation Steps

### 1. Install `clasp`

1. Open your terminal or command prompt.
2. Install `clasp` globally by running the following command:
   ```bash
   npm install -g @google/clasp
   ```

### 2. Log in to your Google account

1. Authenticate `clasp` with your Google account by running:
   ```bash
   clasp login
   ```
2. Follow the on-screen instructions to complete the authentication process.

### 3. Clone the repository

1. Clone your repository to your local machine:
   ```bash
   git clone git@github.com:david-vct/gdocs-vocabulary-tools.git
   ```
2. Navigate to the project directory:
   ```bash
   cd gdocs-vocabulary-tools
   ```

### 4. Set up the project

1. Install dependencies
   ```bash
   npm install
   ```
1. Create a new Google Apps Script project:
   ```bash
   clasp create --type standalone --title "Vocabulary tools"
   ```
1. Push your local files to the Apps Script project:
   ```bash
   clasp push
   ```

### 5. Run project on Google Docs

1. Open [Google Apps Script](https://script.google.com/home)
1. Open the project _Vocabulary tools_
1. Under the _Deployment_ menu, click _Test Deployment_
1. Create a new deployment
1. Run the deployment

## Authors

- **David Vicente** - _Initial work_ - [david-vct](https://github.com/david-vct)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
