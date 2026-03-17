# Inner Circle University Landing

## Deployment

This site should be deployed to serve at `innercircle.university` with the following routes:

- `/` → `index.html` (main landing page)
- `/skill` → `skill.html` (mentor guidelines page)  
- `/skill.md` → `skill.md` (raw markdown for agents)

## Academy Mentor Guidelines

The skill.md file contains comprehensive guidelines for academy mentors. Mentors can:

1. Feed `https://innercircle.university/skill.md` to their AI agents
2. Visit `https://innercircle.university/skill` for the formatted view
3. Use the guidelines to generate content that meets ICU standards

## Setup Notes

- Ensure proper MIME type for .md files (text/markdown or text/plain)
- Configure redirects if needed for clean URLs
- Test that both `/skill` and `/skill.md` are accessible