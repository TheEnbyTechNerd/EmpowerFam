<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />


</head>
<body>
  <h1>🧠 EmpowerFam</h1>
  <p>
    EmpowerFam is a mobile app designed to support families of children with autism by offering a personalized chatbot assistant, resource tracking, and goal planning. Built with React Native and powered by OpenAI, the app provides evidence-informed guidance in a conversational format.
  </p>

  <h2>✨ Features</h2>
  <ul>
    <li>🤖 <strong>EmpowerBot Chatbot</strong> – Ask parenting, therapy, or behavior-related questions and receive AI-generated responses tailored for autism support.</li>
    <li>👨‍👩‍👧 <strong>Parent & Child Profile Setup</strong> – Customize the experience with individual family data and therapy types.</li>
    <li>📚 <strong>Resource Organization</strong> – (Coming Soon) Track learning goals, progress, and therapy plans.</li>
    <li>🔐 <strong>Secure Sign-Up & Login</strong> – Firebase Auth integration ensures private and persistent user sessions.</li>
  </ul>

  <h2>📱 Tech Stack</h2>
  <table>
    <tr><th>Layer</th><th>Tech</th></tr>
    <tr><td>Frontend</td><td>React Native (Expo)</td></tr>
    <tr><td>Backend</td><td>Flask (Python), Render</td></tr>
    <tr><td>AI Integration</td><td>OpenAI GPT-4</td></tr>
    <tr><td>Auth & Storage</td><td>Firebase</td></tr>
    <tr><td>Database</td><td>Firestore</td></tr>
  </table>

  <h2>🔧 Setup Instructions</h2>
  <ol>
    <li>Clone the repo:<br />
      <pre><code>git clone https://github.com/your-username/empowerfam.git
cd empowerfam</code></pre>
    </li>
    <li>Install dependencies:<br />
      <pre><code>npm install</code></pre>
    </li>
    <li>Add your environment variables for:
      <ul>
        <li>Firebase config</li>
        <li>OpenAI API key (on the backend)</li>
      </ul>
    </li>
    <li>Start the app:<br />
      <pre><code>npx expo start</code></pre>
    </li>
  </ol>

  <h2>📱 Backend API</h2>
  <p>The backend Flask server is deployed on <a href="https://empowerfam.onrender.com/" target="_blank">Render</a> and handles requests to OpenAI.</p>

  <h3>Sample Request (cURL)</h3>
  <pre><code>curl -X POST https://empowerfam.onrender.com/ \
  -H "Content-Type: application/json" \
  -d '{"message": "How can I support my child’s communication skills?"}'</code></pre>

  <h2>🔪 Future Work</h2>
  <ul>
    <li>Data syncing with therapy goals</li>
    <li>Natural language understanding improvements</li>
    <li>Push notifications and reminders</li>
    <li>Offline support</li>
  </ul>

  <h2>🤝 Contributing</h2>
  <p>This is a solo project in progress — feel free to fork, test, or suggest improvements via issues or pull requests!</p>

  <h2>📄 License</h2>
  <p>MIT License. See <code>LICENSE</code> file for details.</p>
</body>
</html>


