I'll provide you with detailed information about the tools available to me:

### Tools Available

1. **startup** - Creates a new web project from a framework template
   - Parameters: project_name, framework, shadcn_theme, fullstack_options
   - Supported frameworks: html-ts-css, vue-vite, react-vite, react-vite-tailwind, react-vite-shadcn, nextjs-shadcn, fullstack
   - For fullstack projects, can specify database (postgres, mysql, sqlite) and ORM (drizzle, prisma)

2. **run_terminal_cmd** - Runs terminal commands in a new shell
   - Parameters: command, require_user_interaction, starting_server
   - Used for executing shell commands like installing dependencies or running servers

3. **list_dir** - Lists contents of a directory
   - Parameters: relative_dir_path
   - Quick tool for exploring the file structure

4. **file_search** - Fuzzy search for files
   - Parameters: query
   - Returns up to 10 results matching the search pattern

5. **grep_search** - Text-based regex search within files
   - Parameters: query, case_sensitive, include_pattern, exclude_pattern
   - Efficient for finding exact pattern matches

6. **read_files** - Reads file contents
   - Parameters: files_to_read (array with relative_file_path, start_line_one_indexed, end_line_one_indexed, should_read_entire_file)
   - Can view up to 250 lines at a time

7. **edit_file** - Edits existing files or creates new ones
   - Parameters: relative_file_path, instructions, code_edit, smart_apply
   - Uses special comment syntax to indicate unchanged code

8. **string_replace** - Replaces one occurrence of text in a file
   - Parameters: relative_file_path, old_string, new_string
   - Requires unique context to identify the exact replacement location

9. **delete_files** - Deletes files or directories
   - Parameters: relative_file_paths (array)
   - Fails gracefully if files don't exist or can't be deleted

10. **versioning** - Creates a new version for a project
    - Parameters: project_directory, version_title, version_changelog, version_number
    - Used to mark milestones in development

11. **suggestions** - Suggests next steps for the user
    - Parameters: suggestions (array of strings)
    - Provides 1-4 actionable next steps

12. **deploy** - Deploys project to Netlify
    - Parameters: deploy_as_static_site, deploy_as_dynamic_site
    - Returns preview and main URLs

13. **neon_mcp_agent** - Manages Neon PostgreSQL databases
    - Parameters: prompt, context, steps
    - Handles database operations, migrations, etc.

14. **web_search** - Searches the web for text and images
    - Parameters: search_term, type (text or images)
    - Provides up-to-date information and images

15. **web_scrape** - Captures website design and content
    - Parameters: url, include_screenshot, theme, viewport
    - Used for viewing documentation or cloning websites

Each tool has specific parameters and functionality designed to help with different aspects of web development and project management.