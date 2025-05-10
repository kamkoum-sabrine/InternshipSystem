# Internship Management System

## About
Internship Management System is a web-based application developed by Sabrine Kamkoum, Mahdi Toumi, and Mohamed Houssem Salhi at the National Engineering School of Carthage. Designed to streamline internship processes, it automates document submission, tracking, and validation for students, internship services, and directors, enhancing efficiency and transparency.

## Features
- **User Roles**: Supports Super Administrator, Internship Director, Internship Service, and Student roles with tailored functionalities.
- **Pre-Internship Management**:
  - Students: Submit profiles, internship applications, and PDF conventions; track document status.
  - Internship Service: Manage enterprise contacts and validate application fields.
  - Internship Director: Validate conventions based on internship type, duration, and uniqueness.
  - Super Administrator: Create and manage user accounts, send credentials via email.
- **Post-Internship Management**:
  - Students: Submit attestations, posters (initiation), or reports (perfectionnement/PFE).
  - Internship Service: Validate submissions and publish defense schedules.
- **Document Verification**: Automated checks for PDF authenticity (e.g., enterprise stamp) and consistency.
- **Cross-Platform Access**: Compatible with major browsers (Chrome, Firefox, Edge, Safari) on Windows, macOS, and Linux.

## Installation
1. **Prerequisites**:
   - Web server (e.g., Apache, Nginx)
   - PHP or Node.js (depending on implementation)
   - MySQL or equivalent database
   - Modern web browser
2. **Setup**:
   - Clone the repository: `git clone https://github.com/yourusername/internship-management-system.git`
   - Configure the web server to point to the project directory.
   - Set up the database using the provided SQL schema (if applicable).
3. **Run**:
   - Import the database schema.
   - Update configuration files with database credentials.
   - Access the application via the browser (e.g., `http://localhost/internship-management-system`).

## Project Structure
- **Backend**: Handles user authentication, document management, and validation logic.
- **Frontend**: Provides an intuitive interface for profile management, document submission, and status tracking.
- **Database**: Stores user data, internship details, documents, and schedules.
- **Scripts**: Includes PDF verification and email notification functionalities.

## Usage
1. **Super Administrator**:
   - Log in to create accounts for students, internship services, and directors.
   - Activate/deactivate student accounts as needed.
2. **Students**:
   - Log in to manage profiles, submit conventions, and track document statuses.
   - Post-internship, upload attestations, posters, or reports.
3. **Internship Service**:
   - Validate submitted documents and upload enterprise contacts.
   - Publish defense schedules.
4. **Internship Director**:
   - Review and validate conventions based on internship criteria.
   - Ensure compliance with duration and subject requirements.

## Limitations
- Relies on PDF uploads, requiring manual enterprise stamp verification.
- No mobile app; browser-based access only.
- Security depends on proper server configuration.

## Future Improvements
- Implement a mobile application for enhanced accessibility.
- Add real-time notifications for document status updates.
- Integrate advanced PDF parsing for automated field extraction.
- Enhance security with two-factor authentication.

## Contributors
- **Sabrine Kamkoum**
- **Mahdi Toumi**
- **Mohamed Houssem Salhi**

## Acknowledgments
Developed as part of a project at the National Engineering School of Carthage, University of Carthage, submitted on Mai 4, 2025.
