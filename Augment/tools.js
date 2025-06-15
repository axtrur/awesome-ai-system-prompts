const extractedData = {

    /**
     * Descriptions of tools available within the system.
     * These were likely found in class definitions extending a base 'Tool' or 'Vr' class.
     */
    toolDescriptions: [
        {
            name: 'shell', // Inferred from zi.shell constant usage
            description: `Execute a shell command.

- You can use this tool to interact with the user's local version control system. Do not use the
retrieval tool for that purpose.
- If there is a more specific tool available that can perform the function, use that tool instead of
this one.

The OS is ${process.platform}. The shell is '${/*this._shellName - determined dynamically*/ ''}'.`
            // inputSchemaJson is omitted for brevity, but was present in the original code.
        },
        {
            name: 'webFetch', // Inferred from zi.webFetch constant usage
            description: `Fetches data from a webpage and converts it into Markdown.

1. The tool takes in a URL and returns the content of the page in Markdown format;
2. If the return is not valid Markdown, it means the tool cannot successfully parse this page.`
            // inputSchemaJson is omitted for brevity, but was present in the original code.
        },
        {
            name: 'readFile', // Inferred from Hn.readFile constant usage
            description: "Read a file."
            // inputSchemaJson is omitted for brevity, but was present in the original code.
        },
        {
            name: 'saveFile', // Inferred from Hn.saveFile constant usage
            description: `Save a new file. Use this tool to write new files with the attached content. It CANNOT modify existing files. Do NOT use this tool to edit an existing file by overwriting it entirely. Use the str-replace-editor tool to edit existing files instead.`
            // inputSchemaJson is omitted for brevity, but was present in the original code.
        },
        {
            name: 'editFile', // Inferred from Hn.editFile constant usage
            description: `
Edit a file. Accepts a file path and a description of the edit.
This tool can edit whole files.
The description should be detailed and precise, and include all required information to perform the edit.
It can include both natural language and code. It can include multiple code snippets to described different
edits in the file. It can include descriptions of how to perform these edits precisely.

All the contents that should go in a file should be placed in a markdown code block, like this:

<begin-example>
Add a function called foo.

\`\`\`
def foo():
    ...
\`\`\`
</end-example>

This includes all contents, even if it's not code.

Be precise or I will take away your toys.

Prefer to use this tool when editing parts of a file.
`
            // inputSchemaJson is omitted for brevity, but was present in the original code.
        },
        {
            name: 'strReplaceEditor', // Inferred from zi.strReplaceEditor constant usage
            description: `Custom editing tool for viewing, creating and editing files
* \`path\` is a file path relative to the workspace root
* command \`view\` displays the result of applying \`cat -n\`.
* If a \`command\` generates a long output, it will be truncated and marked with \`<response clipped>\`
* \`insert\` and \`str_replace\` commands output a snippet of the edited section for each entry. This snippet reflects the final state of the file after all edits and IDE auto-formatting have been applied.


Notes for using the \`str_replace\` command:
* Use the \`str_replace_entries\` parameter with an array of objects
* Each object should have \`old_str\`, \`new_str\`, \`old_str_start_line_number\` and \`old_str_end_line_number\` properties
* The \`old_str_start_line_number\` and \`old_str_end_line_number\` parameters are 1-based line numbers
* Both \`old_str_start_line_number\` and \`old_str_end_line_number\` are INCLUSIVE
* The \`old_str\` parameter should match EXACTLY one or more consecutive lines from the original file. Be mindful of whitespace!
* Empty \`old_str\` is allowed only when the file is empty or contains only whitespaces
* It is important to specify \`old_str_start_line_number\` and \`old_str_end_line_number\` to disambiguate between multiple occurrences of \`old_str\` in the file
* Make sure that \`old_str_start_line_number\` and \`old_str_end_line_number\` do not overlap with other entries in \`str_replace_entries\`

Notes for using the \`insert\` command:
* Use the \`insert_line_entries\` parameter with an array of objects
* Each object should have \`insert_line\` and \`new_str\` properties
* The \`insert_line\` parameter specifies the line number after which to insert the new string
* The \`insert_line\` parameter is 1-based line number
* To insert at the very beginning of the file, use \`insert_line: 0\`

Notes for using the \`view\` command:
* Strongly prefer to use larger ranges of at least 1000 lines when scanning through files. One call with large range is much more efficient than many calls with small ranges

IMPORTANT:
* This is the only tool you should use for editing files.
* If it fails try your best to fix inputs and retry.
* DO NOT fall back to removing the whole file and recreating it from scratch.
* DO NOT use sed or any other command line tools for editing files.
* Try to fit as many edits in one tool call as possible
* Use view command to read the file before editing it.
`
            // inputSchemaJson is omitted for brevity, but was present in the original code.
        },
        {
            name: 'removeFiles', // Inferred from Hn.removeFiles constant usage
            description: `Remove files. ONLY use this tool to delete files in the user's workspace. This is the only safe tool to delete files in a way that the user can undo the change. Do NOT use the shell or launch-process tools to remove files.`
            // inputSchemaJson is omitted for brevity, but was present in the original code.
        },
        {
            name: 'remember', // Inferred from zi.remember constant usage
            description: `Call this tool when user asks you:
- to remember something
- to create memory/memories

Use this tool only with information that can be useful in the long-term.
Do not use this tool for temporary information.
`
            // inputSchemaJson is omitted for brevity, but was present in the original code.
        },
        {
            name: 'launchProcess', // Inferred from Hn.launchProcess constant usage
            description: `Launch a new process with a shell command. A process can be waiting (\`wait=true\`) or non-waiting (\`wait=false\`, which is default).

If \`wait=true\`, launches the process in an interactive terminal, and waits for the process to complete up to
\`wait_seconds\` seconds (default: 60). If the process ends
during this period, the tool call returns. If the timeout expires, the process will continue running in the
background but the tool call will return. You can then interact with the process using the other process tools.

Note: Only one waiting process can be running at a time. If you try to launch a process with \`wait=true\`
while another is running, the tool will return an error.

If \`wait=false\`, launches a background process in a separate terminal. This returns immediately, while the
process keeps running in the background.

Notes:
- Use \`wait=true\` processes when the command is expected to be short, or when you can't
proceed with your task until the process is complete. Use \`wait=false\` for processes that are
expected to run in the background, such as starting a server you'll need to interact with, or a
long-running process that does not need to complete before proceeding with the task.
- If this tool returns while the process is still running, you can continue to interact with the process
using the other available tools. You can wait for the process, read from it, write to it, kill it, etc.
- You can use this tool to interact with the user's local version control system. Do not use the
retrieval tool for that purpose.
- If there is a more specific tool available that can perform the function, use that tool instead of
this one.

The OS is ${process.platform}.`
            // inputSchemaJson is omitted for brevity, but was present in the original code.
        },
        {
            name: 'killProcess', // Inferred from Hn.killProcess constant usage
            description: "Kill a process by its process ID."
            // inputSchemaJson is omitted for brevity, but was present in the original code.
        },
        {
            name: 'readProcess', // Inferred from Hn.readProcess constant usage
            description: `Read output from a running process.`
            // inputSchemaJson is omitted for brevity, but was present in the original code.
        },
        {
            name: 'writeProcess', // Inferred from Hn.writeProcess constant usage
            description: `Write input to a process's stdin.`
            // inputSchemaJson is omitted for brevity, but was present in the original code.
        },
        {
            name: 'listProcesses', // Inferred from Hn.listProcesses constant usage
            description: "List all known processes and their states."
            // inputSchemaJson is omitted for brevity, but was present in the original code.
        },
        {
            name: 'waitProcess', // Inferred from Hn.waitProcess constant usage
            description: "Wait for a process to complete or timeout."
            // inputSchemaJson is omitted for brevity, but was present in the original code.
        },
        {
            name: 'codebaseRetrieval', // Inferred from zi.codebaseRetrieval constant usage
            description: `This tool is Augment's context engine, the world's best codebase context engine. It:
1. Takes in a natural language description of the code you are looking for;
2. Uses a proprietary retrieval/embedding model suite that produces the highest-quality recall of relevant code snippets from across the codebase;
3. Maintains a real-time index of the codebase, so the results are always up-to-date and reflects the current state of the codebase on the disk;
4. Can retrieve across different programming languages;
5. Only reflects the current state of the codebase on the disk, and has no information on version control or code history.`
            // inputSchemaJson is omitted for brevity, but was present in the original code.
        },
        {
            name: 'openBrowser', // Inferred from Hn.openBrowser constant usage
            description: `Open a URL in the default browser.

1. The tool takes in a URL and opens it in the default browser.
2. The tool does not return any content. It is intended for the user to visually inspect and interact with the page. You will not have access to it.
3. You should not use \`open-browser\` on a URL that you have called the tool on before in the conversation history, because the page is already open in the user's browser and the user can see it and refresh it themselves. Each time you call \`open-browser\`, it will jump the user to the browser window, which is highly annoying to the user.`
            // inputSchemaJson is omitted for brevity, but was present in the original code.
        }
    ],

    /**
     * Prompt templates and snippets used for various tasks like onboarding,
     * codebase orientation, memory injection/compression, etc.
     * Placeholders like {variable} indicate dynamic content insertion.
     */
    promptTemplates: {
        onboarding: {
            introduction: `
Instructions for you:
- Repeat the following markdown without the codeblock
\`\`\`
# \u{1F44B} Meet Auggie

I'm your AI coding assistant. I excel at understanding large, complex codebases but I am happy to chip in on codebases of all sizes.
\`\`\`
`,
            gitConfigured: `
Instructions for you:
- Repeat the following markdown without the codeblock
\`\`\`
## Who are you?

Mind if I fetch some information about you from your git configuration:
\`\`\`
- Run \`git config user.name\` and \`git config user.email\`
- Repeat the following text in the codeblock
\`\`\`
Hey, {name}, since I am an LLM and I don't have a real memory (sad) I'll be using \`\u{1F4E6} Augment Memories\`
\`\`\`
`,
            memories: `
Instructions for you:
- Repeat the following markdown without the codeblock
\`\`\`
## How I work

* **Augment Memories:** Project-specific memories
  * New folder = clean slate
  * I learn from my mistakes when you correct me
  * You can ask me to remember things (e.g. "commit to memory...")

* **Native Integrations:** Configure integrations like GitHub + Linear with 1-click over in [Settings](command:vscode-augment.showSettingsPanel)
\`\`\`
`
        },
        orientation: {
            localization: "{languageTree} prompt for {programmingLanguage}", // Inferred template name and structure
            detectLanguages: "Detect languages prompt using {fileExtensionsList}", // Inferred template name and structure
            compression: "Compression prompt using {assembledKnowledge}", // Inferred template name and structure
            buildTest: "Build/test query template for {language} using {rootFolderContent} and {locationList}" // Inferred template name and structure
        },
        memories: {
            injection: "Inject new memory '{newMemory}' into current memories:\n{currentMemories}", // Inferred structure
            complexInjection: "Inject complex new memory '{newMemory}' into current memories:\n{currentMemories}", // Inferred structure
            compression: "Compress memories:\n{memories}\nTarget size: {compressionTarget}", // Inferred structure
            recentMemoriesSubprompt: "Consider these recent memories:\n{recentMemories}", // Inferred structure
            classifyAndDistill: "Classify and distill message: {message}", // Inferred structure
            distill: "Distill message: {message}" // Inferred structure
        },
        contextualSnippets: {
            folderContext: `- The user is working from the directory \`\${relPath}\`.
- When the user mentions a file name or when viewing output from shell commands, it is likely relative to \`\${relPath}\`.
- When creating, deleting, viewing or editing files, first try prepending \`\${relPath}\` to the path.
- When running shell commands, do not prepend \`\${relPath}\` to the path.
` // Found as variable `qgt`
        },
        memoriesFileHeader: [
            // Multiple variations exist, likely chosen based on usage count
            String.raw`
                     __  __                           _
                    |  \/  |                         (_)
                    | \  / | ___ _ __ ___   ___  _ __ _  ___  ___
                    | |\/| |/ _ \ '_ ' _ \ / _ \| '__| |/ _ \/ __|
                    | |  | |  __/ | | | | | (_) | |  | |  __/\__ \
                    |_|  |_|\___|_| |_| |_|\___/|_|  |_|\___||___/

 .+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.
( Memories help me remember useful details for future interactions.               )
 )                                                                               (
( During Agent sessions, I'll try to create useful Memories automatically.        )
 )Memories can be about your codebase, technologies or your personal preferences.(
(                                                                                 )
 )Your Memories belong to you and are stored locally at the bottom of this file; (
( in the future, we may give you an option to share your memories with others.    )
 )                                                                               (
( NOTE: Memories will be compressed when this file grows too large.               )
 )For personal Memories: consider putting them in User Guidelines (via '@' menu) (
( For repository-level Memories: consider using '.augment-guidelines' file        )
 )Neither will be compressed.                                                    (
(                                                                                 )
 )Happy Coding!                                                                  (
(                                                                                 )
 "+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"+.+"
                  ()
                O
              o
{AUGGIE_LOGO}

↓↓↓ MEMORIES START HERE ↓↓↓
`,
            String.raw`
                     __  __                           _
                    |  \/  |                         (_)
                    | \  / | ___ _ __ ___   ___  _ __ _  ___  ___
                    | |\/| |/ _ \ '_ ' _ \ / _ \| '__| |/ _ \/ __|
                    | |  | |  __/ | | | | | (_) | |  | |  __/\__ \
                    |_|  |_|\___|_| |_| |_|\___/|_|  |_|\___||___/

 __________________________________________________________________________________
/\                                                                                 \
\_| NOTE: Memories will be compressed when this file grows too large.              |
  | For personal Memories: consider putting them in User Guidelines (via '@' menu) |
  | For repository-level Memories: consider using '.augment-guidelines' file       |
  | Neither will be compressed.                                                    |
  |   _____________________________________________________________________________|_
   \_/_______________________________________________________________________________/

↓↓↓ MEMORIES START HERE ↓↓↓
`
        ],
        commitMessage: {
            // The actual prompt template for commit messages is likely constructed dynamically
            // within the `CommitMessagePromptPreparer` class, combining diffs and commit history.
            // Representing the core idea here.
            generate: `Generate a commit message based on the following changes:
<diff>
{diff}
</diff>

Consider these recent relevant commits by the same author:
<relevant_commits>
{relevant_commit_messages}
</relevant_commits>

Consider these example commits from the repository:
<example_commits>
{example_commit_messages}
</example_commits>

Changed file stats:
{changedFileStats}`
        }
    }
};

// Example usage (optional):
// console.log(JSON.stringify(extractedData, null, 2));