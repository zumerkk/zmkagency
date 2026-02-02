import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

// ZMK Agency Project Path
const PROJECT_PATH = "/Users/zumerkekillioglu/Desktop/ZMKAGENCY";
const PROJECT_NAME = "zmk-agency";
const API_KEY = "sk-user-PQeb_qX_zMwe_e_RykQ2vaJqwaDwtn99I0aQcEsVejjlC61q348HuBZPxGZP7_7yN2cZZ7IGU2Ve8Kl16Rg3lH6jfktPrcZ29V6WkhOGA8flmUfnpWrDFKpMSOz70WIyWF4";

const testSpriteCmd = "npx";
const testSpriteArgs = ["@testsprite/testsprite-mcp"];

// Ensure directories exist
const tmpDir = path.join(PROJECT_PATH, 'testsprite_tests/tmp');
const prdDir = path.join(tmpDir, 'prd_files');
fs.mkdirSync(prdDir, { recursive: true });

// Create initial requirements.txt
const requirements = `
Project: ZMK Agency
Type: Digital Agency Website
URL: https://zmkagency.com (Live)
Goal: Ensure the website is fully functional, responsive, and aesthetically pleasing.
Key Features to Test:
- Homepage navigation and section loading
- Services page and details
- Pricing page toggle (Monthly/Project) and plan selection
- Contact form submission
- Pricing Wizard Form submission
- Admin login (if applicable)
- 404 Page
Instructions: Verify all links, check for console errors, ensure forms validate input.
`;
fs.writeFileSync(path.join(prdDir, 'requirements.txt'), requirements);

console.log(`Starting TestSprite MCP Server...`);

const server = spawn(testSpriteCmd, testSpriteArgs, {
    cwd: PROJECT_PATH,
    env: { ...process.env, API_KEY },
    stdio: ['pipe', 'pipe', 'inherit']
});

let messageId = 0;
const pendingRequests = new Map();

// Buffer to handle split JSON chunks
let buffer = '';

server.stdout.on('data', (data) => {
    buffer += data.toString();
    const lines = buffer.split('\n');
    buffer = lines.pop(); // Keep the last incomplete line

    for (const line of lines) {
        if (!line.trim()) continue;
        try {
            const msg = JSON.parse(line);
            if (msg.id !== undefined && pendingRequests.has(msg.id)) {
                pendingRequests.get(msg.id)(msg);
                pendingRequests.delete(msg.id);
            }
        } catch (e) {
            // Ignore non-JSON lines (logs)
            console.log("Log:", line);
        }
    }
});

async function sendRequest(method, params) {
    messageId++;
    const id = messageId;
    const msg = {
        jsonrpc: "2.0",
        id,
        method,
        params
    };

    console.log(`Sending ${method}...`);
    server.stdin.write(JSON.stringify(msg) + "\n");

    return new Promise((resolve, reject) => {
        // Timeout 10 mins (some steps are slow)
        const timeout = setTimeout(() => {
            reject(new Error("Timeout waiting for " + method));
            pendingRequests.delete(id);
        }, 600000);

        pendingRequests.set(id, (response) => {
            clearTimeout(timeout);
            if (response.error) {
                console.error("Response Error:", JSON.stringify(response.error, null, 2));
                reject(new Error(response.error.message));
            } else {
                console.log("Response Result:", JSON.stringify(response.result).substring(0, 100) + "...");
                resolve(response.result);
            }
        });
    });
}

async function sendNotification(method, params) {
    const msg = {
        jsonrpc: "2.0",
        method,
        params
    };
    console.log(`Sending notification ${method}...`);
    server.stdin.write(JSON.stringify(msg) + "\n");
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    try {
        // 1. Initialize
        await sendRequest("initialize", {
            protocolVersion: "2024-11-05",
            capabilities: {},
            clientInfo: { name: "agent", version: "1.0.0" }
        });
        await sendNotification("notifications/initialized", {}); // Notify properly
        console.log("Initialized.");

        // 2. Bootstrap
        console.log("Bootstrapping...");
        await sendRequest("tools/call", {
            name: "testsprite_bootstrap",
            arguments: {
                projectPath: PROJECT_PATH,
                type: "frontend",
                localPort: 5173,
                testScope: "codebase"
            }
        });

        // 3. (Skipped) Generate Code Summary - Manually created
        console.log("Skipping dynamic code summary generation (files provided manually)...");

        // 4. Generate Standard PRD
        console.log("Generating Standard PRD...");
        await sendRequest("tools/call", {
            name: "testsprite_generate_standardized_prd",
            arguments: {
                projectPath: PROJECT_PATH
            }
        });

        // 5. Generate Frontend Test Plan
        console.log("Generating Frontend Test Plan...");
        await sendRequest("tools/call", {
            name: "testsprite_generate_frontend_test_plan",
            arguments: {
                projectPath: PROJECT_PATH,
                needLogin: false
            }
        });

        // 6. Generate Code and Execute
        console.log("Generating Code and Executing...");
        await sendRequest("tools/call", {
            name: "testsprite_generate_code_and_execute",
            arguments: {
                projectName: PROJECT_NAME,
                projectPath: PROJECT_PATH,
                testIds: [],
                additionalInstruction: "Run fully automated tests for main pages."
            }
        });

        console.log("All steps completed successfully.");
    } catch (err) {
        console.error("Error running workflow:", err);
    } finally {
        server.kill();
        process.exit(0);
    }
}

run();
