(function () {
  "use strict";

  // ==================================================
  // FIND SCRIPT
  // ==================================================

  const scriptElement =
    document.currentScript ||
    document.querySelector("script[data-chatbot-id]");

  if (!scriptElement) {
    console.error(
      "ChatSupportAI: widget script not found."
    );
    return;
  }

  const chatbotId =
    scriptElement.getAttribute("data-chatbot-id");

  if (!chatbotId) {
    console.error(
      "ChatSupportAI: data-chatbot-id is missing."
    );
    return;
  }

  // ==================================================
  // WIDGET ORIGIN
  // ==================================================

  const widgetOrigin =
    new URL(scriptElement.src).origin;

  const configUrl =
    `${widgetOrigin}/api/widget/${encodeURIComponent(
      chatbotId
    )}`;

  const chatUrl =
    `${widgetOrigin}/api/widget/chat`;

  // ==================================================
  // SESSION ID
  // ==================================================

  let sessionId = null;

  try {
    const storageKey =
      `chatsupportai_session_${chatbotId}`;

    sessionId =
      sessionStorage.getItem(storageKey);

    if (!sessionId) {
      sessionId = crypto.randomUUID();

      sessionStorage.setItem(
        storageKey,
        sessionId
      );
    }
  } catch (error) {
    console.warn(
      "ChatSupportAI: sessionStorage unavailable.",
      error
    );

    sessionId =
      `session-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}`;
  }

  // ==================================================
  // CONTAINER + SHADOW DOM
  // ==================================================

  const container = document.createElement("div");

  container.id = "chatsupportai-widget";

  document.body.appendChild(container);

  const shadowRoot =
    container.attachShadow({
      mode: "open",
    });

  // ==================================================
  // STYLES
  // ==================================================

  const style = document.createElement("style");

  style.textContent = `
    :host {
      all: initial;
    }

    * {
      box-sizing: border-box;
    }

    .csai-wrapper {
      position: fixed;
      right: 20px;
      bottom: 20px;
      z-index: 2147483647;
      font-family:
        Inter,
        ui-sans-serif,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
    }

    .csai-button {
      width: 56px;
      height: 56px;
      border: 0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #fff;
      font-size: 22px;
      font-weight: 600;
      box-shadow:
        0 12px 30px rgba(0, 0, 0, 0.18);
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
    }

    .csai-button:hover {
      transform: translateY(-2px);
      box-shadow:
        0 16px 35px rgba(0, 0, 0, 0.22);
    }

    .csai-panel {
      position: absolute;
      right: 0;
      left: auto;
      bottom: 70px;
      width: 380px;
      height: 560px;
      display: none;
      flex-direction: column;
      overflow: hidden;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 20px;
      box-shadow:
        0 24px 70px rgba(0, 0, 0, 0.18);
    }

    .csai-panel.open {
      display: flex;
      animation:
        csai-slide-up 0.22s ease-out;
    }

    @keyframes csai-slide-up {
      from {
        opacity: 0;
        transform: translateY(12px) scale(0.98);
      }

      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .csai-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      color: #ffffff;
    }

    .csai-header-left {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }

    .csai-avatar {
      width: 38px;
      height: 38px;
      flex-shrink: 0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.16);
      font-size: 15px;
      font-weight: 700;
    }

    .csai-title {
      min-width: 0;
    }

    .csai-name {
      margin: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 13px;
      font-weight: 700;
    }

    .csai-status {
      margin-top: 2px;
      font-size: 10px;
      opacity: 0.75;
    }

    .csai-close {
      width: 32px;
      height: 32px;
      border: 0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #fff;
      background: rgba(255, 255, 255, 0.12);
      font-size: 18px;
    }

    .csai-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      background: #fafafa;
    }

    .csai-message {
      display: flex;
      margin-bottom: 12px;
    }

    .csai-message.user {
      justify-content: flex-end;
    }

    .csai-message.assistant {
      justify-content: flex-start;
    }

    .csai-bubble {
      max-width: 85%;
      padding: 10px 12px;
      border-radius: 14px;
      font-size: 12px;
      line-height: 1.5;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .csai-message.user .csai-bubble {
      border-radius:
        14px 14px 4px 14px;
      color: #ffffff;
      background: #111827;
    }

    .csai-message.assistant .csai-bubble {
      border-radius:
        14px 14px 14px 4px;
      color: #374151;
      background: #f0f1f3;
    }

    .csai-error .csai-bubble {
      color: #b91c1c;
      background: #fef2f2;
      border: 1px solid #fecaca;
    }

    .csai-typing {
      display: flex;
      align-items: center;
      gap: 4px;
      width: fit-content;
      padding: 11px 13px;
      border-radius: 14px 14px 14px 4px;
      background: #f0f1f3;
    }

    .csai-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #9ca3af;
      animation: csai-bounce 1s infinite;
    }

    .csai-dot:nth-child(2) {
      animation-delay: 0.15s;
    }

    .csai-dot:nth-child(3) {
      animation-delay: 0.3s;
    }

    @keyframes csai-bounce {
      0%,
      60%,
      100% {
        transform: translateY(0);
      }

      30% {
        transform: translateY(-4px);
      }
    }

    .csai-input-area {
      padding: 12px;
      border-top: 1px solid #eef0f2;
      background: #ffffff;
    }

    .csai-input-box {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 8px 8px 12px;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      background: #fafafa;
    }

    .csai-input {
      min-width: 0;
      flex: 1;
      border: 0;
      outline: 0;
      background: transparent;
      color: #111827;
      font-size: 12px;
    }

    .csai-input::placeholder {
      color: #9ca3af;
    }

    .csai-input:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .csai-send {
      width: 36px;
      height: 36px;
      flex-shrink: 0;
      border: 0;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #ffffff;
      font-size: 15px;
      font-weight: 700;
    }

    .csai-send:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .csai-footer {
      margin-top: 7px;
      text-align: center;
      font-size: 9px;
      color: #9ca3af;
    }

    @media (max-width: 600px) {
      .csai-wrapper {
        right: 10px;
        bottom: 10px;
      }

      .csai-panel {
        right: 0;
        bottom: 66px;
        width: calc(100vw - 20px);
        height: min(
          560px,
          calc(100vh - 90px)
        );
        border-radius: 18px;
      }
    }
  `;

  shadowRoot.appendChild(style);

  // ==================================================
  // WRAPPER
  // ==================================================

  const wrapper = document.createElement("div");

  wrapper.className = "csai-wrapper";

  shadowRoot.appendChild(wrapper);

  // ==================================================
  // FLOATING BUTTON
  // ==================================================

  const button = document.createElement("button");

  button.className = "csai-button";
  button.type = "button";
  button.setAttribute(
    "aria-label",
    "Open ChatSupportAI"
  );

  button.textContent = "✦";

  wrapper.appendChild(button);

  // ==================================================
  // PANEL
  // ==================================================

  const panel = document.createElement("div");

  panel.className = "csai-panel";

  // ==================================================
  // HEADER
  // ==================================================

  const header = document.createElement("div");

  header.className = "csai-header";

  const headerLeft =
    document.createElement("div");

  headerLeft.className =
    "csai-header-left";

  const avatar =
    document.createElement("div");

  avatar.className = "csai-avatar";
  avatar.textContent = "AI";

  const titleContainer =
    document.createElement("div");

  titleContainer.className =
    "csai-title";

  const name =
    document.createElement("p");

  name.className = "csai-name";
  name.textContent = "ChatSupportAI";

  const status =
    document.createElement("p");

  status.className = "csai-status";
  status.textContent = "Online";

  titleContainer.appendChild(name);
  titleContainer.appendChild(status);

  headerLeft.appendChild(avatar);
  headerLeft.appendChild(titleContainer);

  const closeButton =
    document.createElement("button");

  closeButton.className = "csai-close";
  closeButton.type = "button";
  closeButton.textContent = "×";

  header.appendChild(headerLeft);
  header.appendChild(closeButton);

  // ==================================================
  // MESSAGES
  // ==================================================

  const messages =
    document.createElement("div");

  messages.className =
    "csai-messages";

  // ==================================================
  // INPUT AREA
  // ==================================================

  const inputArea =
    document.createElement("div");

  inputArea.className =
    "csai-input-area";

  const inputBox =
    document.createElement("div");

  inputBox.className =
    "csai-input-box";

  const input =
    document.createElement("input");

  input.className = "csai-input";
  input.type = "text";
  input.placeholder =
    "Type your message...";

  const sendButton =
    document.createElement("button");

  sendButton.className =
    "csai-send";

  sendButton.type = "button";
  sendButton.textContent = "↑";
  sendButton.disabled = true;

  inputBox.appendChild(input);
  inputBox.appendChild(sendButton);

  const footer =
    document.createElement("div");

  footer.className =
    "csai-footer";

  footer.textContent =
    "Powered by ChatSupportAI";

  inputArea.appendChild(inputBox);
  inputArea.appendChild(footer);

  // ==================================================
  // ASSEMBLE PANEL
  // ==================================================

  panel.appendChild(header);
  panel.appendChild(messages);
  panel.appendChild(inputArea);

  wrapper.appendChild(panel);

  // ==================================================
  // STATE
  // ==================================================

  let isLoading = false;

  let isConfigLoaded = false;

  // ==================================================
  // HELPERS
  // ==================================================

  function scrollToBottom() {
    messages.scrollTop =
      messages.scrollHeight;
  }

  function createMessage(
    role,
    content,
    isError
  ) {
    const row =
      document.createElement("div");

    row.className =
      `csai-message ${role}`;

    if (isError) {
      row.classList.add(
        "csai-error"
      );
    }

    const bubble =
      document.createElement("div");

    bubble.className =
      "csai-bubble";

    bubble.textContent = content;

    row.appendChild(bubble);

    messages.appendChild(row);

    scrollToBottom();

    return row;
  }

  function createTypingIndicator() {
    const row =
      document.createElement("div");

    row.className =
      "csai-message assistant";

    const typing =
      document.createElement("div");

    typing.className =
      "csai-typing";

    for (let i = 0; i < 3; i++) {
      const dot =
        document.createElement("span");

      dot.className =
        "csai-dot";

      typing.appendChild(dot);
    }

    row.appendChild(typing);

    messages.appendChild(row);

    scrollToBottom();

    return row;
  }

  function setLoading(value) {
    isLoading = value;

    input.disabled = value;

    sendButton.disabled =
      value ||
      !input.value.trim();
  }

  // ==================================================
  // SEND MESSAGE
  // ==================================================

  async function sendMessage() {
    const message =
      input.value.trim();

    if (
      !message ||
      isLoading ||
      !isConfigLoaded
    ) {
      return;
    }

    createMessage(
      "user",
      message,
      false
    );

    input.value = "";

    setLoading(true);

    const typing =
      createTypingIndicator();

    try {
      const response =
        await fetch(chatUrl, {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            publicId: chatbotId,
            sessionId,
            message,
          }),
        });

      const data =
        await response.json();

      typing.remove();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to get a response."
        );
      }

      createMessage(
        "assistant",
        data.answer,
        false
      );
    } catch (error) {
      console.error(
        "ChatSupportAI:",
        error
      );

      typing.remove();

      createMessage(
        "assistant",
        "Sorry, I couldn't process your message right now. Please try again.",
        true
      );
    } finally {
      setLoading(false);

      sendButton.disabled =
        !input.value.trim();
    }
  }

  // ==================================================
  // BUTTON EVENTS
  // ==================================================

  button.addEventListener(
    "click",
    function () {
      panel.classList.toggle("open");

      if (
        panel.classList.contains("open")
      ) {
        setTimeout(() => {
          input.focus();
        }, 100);
      }
    }
  );

  closeButton.addEventListener(
    "click",
    function () {
      panel.classList.remove("open");
    }
  );

  sendButton.addEventListener(
    "click",
    sendMessage
  );

  input.addEventListener(
    "input",
    function () {
      sendButton.disabled =
        isLoading ||
        !input.value.trim();
    }
  );

  input.addEventListener(
    "keydown",
    function (event) {
      if (
        event.key === "Enter"
      ) {
        event.preventDefault();

        sendMessage();
      }
    }
  );

  // ==================================================
  // LOAD CHATBOT CONFIGURATION
  // ==================================================

  fetch(configUrl)
    .then(function (response) {
      if (!response.ok) {
        throw new Error(
          "Failed to load chatbot configuration."
        );
      }

      return response.json();
    })
    .then(function (data) {
      if (!data.success) {
        throw new Error(
          data.message ||
            "Failed to load chatbot configuration."
        );
      }

      const chatbot =
        data.chatbot;

      // Color
      button.style.backgroundColor =
        chatbot.primaryColor;

      header.style.backgroundColor =
        chatbot.primaryColor;

      sendButton.style.backgroundColor =
        chatbot.primaryColor;

      // Bot name
      name.textContent =
        chatbot.botName;

      // Welcome message
      createMessage(
        "assistant",
        chatbot.welcomeMessage,
        false
      );

      // Position
      if (
        chatbot.position ===
        "bottom-left"
      ) {
        wrapper.style.right =
          "auto";

        wrapper.style.left =
          "20px";

        panel.style.right =
          "auto";

        panel.style.left = "0";

        if (
          window.innerWidth <=
          600
        ) {
          wrapper.style.left =
            "10px";
        }
      } else {
        wrapper.style.left =
          "auto";

        wrapper.style.right =
          "20px";

        panel.style.left =
          "auto";

        panel.style.right =
          "0";

        if (
          window.innerWidth <=
          600
        ) {
          wrapper.style.right =
            "10px";
        }
      }

      isConfigLoaded = true;

      sendButton.disabled =
        !input.value.trim();
    })
    .catch(function (error) {
      console.error(
        "ChatSupportAI:",
        error
      );

      createMessage(
        "assistant",
        "Unable to load the chatbot right now.",
        true
      );
    });
})();