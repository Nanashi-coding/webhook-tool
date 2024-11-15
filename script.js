// 言語データ
const translations = {
  ja: {
    title: "Discord Webhook Sender",
    label_language: "言語",
    label_webhook: "Webhook URL",
    label_message: "メッセージ",
    label_embed_title: "埋め込みタイトル",
    label_embed_description: "埋め込み説明",
    label_embed_color: "埋め込みカラー (Hex)",
    label_count: "送信回数",
    label_file_upload: "ファイル添付",
    label_schedule_time: "送信時間 (HH:MM)",
    send_button: "メッセージ送信",
    status_sending: "メッセージ送信中...",
    status_success: "メッセージの送信に成功しました！",
    status_failed: "メッセージの送信に失敗しました。",
    status_fill_fields: "すべての項目を正しく入力してください。"
  },
  en: {
    title: "Discord Webhook Sender",
    label_language: "Language",
    label_webhook: "Webhook URL",
    label_message: "Message",
    label_embed_title: "Embed Title",
    label_embed_description: "Embed Description",
    label_embed_color: "Embed Color (Hex)",
    label_count: "Send Count",
    label_file_upload: "Attach File",
    label_schedule_time: "Schedule Time (HH:MM)",
    send_button: "Send Message",
    status_sending: "Sending messages...",
    status_success: "Messages sent successfully!",
    status_failed: "Failed to send message.",
    status_fill_fields: "Please fill in all fields correctly."
  },
  fr: {
    title: "Envoi de Webhook Discord",
    label_language: "Langue",
    label_webhook: "URL du Webhook",
    label_message: "Message",
    label_embed_title: "Titre de l'intégration",
    label_embed_description: "Description de l'intégration",
    label_embed_color: "Couleur de l'intégration (Hex)",
    label_count: "Nombre d'envois",
    label_file_upload: "Joindre un fichier",
    label_schedule_time: "Heure de l'envoi (HH:MM)",
    send_button: "Envoyer le message",
    status_sending: "Envoi des messages...",
    status_success: "Messages envoyés avec succès !",
    status_failed: "Échec de l'envoi du message.",
    status_fill_fields: "Veuillez remplir tous les champs correctement."
  },
  pt: {
    title: "Enviador de Webhook do Discord",
    label_language: "Idioma",
    label_webhook: "URL do Webhook",
    label_message: "Mensagem",
    label_embed_title: "Título do Embed",
    label_embed_description: "Descrição do Embed",
    label_embed_color: "Cor do Embed (Hex)",
    label_count: "Quantidade de Envio",
    label_file_upload: "Anexar Arquivo",
    label_schedule_time: "Hora Agendada (HH:MM)",
    send_button: "Enviar Mensagem",
    status_sending: "Enviando mensagens...",
    status_success: "Mensagens enviadas com sucesso!",
    status_failed: "Falha ao enviar mensagem.",
    status_fill_fields: "Por favor, preencha todos os campos corretamente."
  },
  es: {
    title: "Enviador de Webhook de Discord",
    label_language: "Idioma",
    label_webhook: "URL de Webhook",
    label_message: "Mensaje",
    label_embed_title: "Título de Embed",
    label_embed_description: "Descripción de Embed",
    label_embed_color: "Color de Embed (Hex)",
    label_count: "Número de envíos",
    label_file_upload: "Adjuntar archivo",
    label_schedule_time: "Hora de envío (HH:MM)",
    send_button: "Enviar mensaje",
    status_sending: "Enviando mensajes...",
    status_success: "¡Mensajes enviados con éxito!",
    status_failed: "Error al enviar el mensaje.",
    status_fill_fields: "Por favor, complete todos los campos correctamente."
  },
  de: {
    title: "Discord Webhook Sender",
    label_language: "Sprache",
    label_webhook: "Webhook-URL",
    label_message: "Nachricht",
    label_embed_title: "Embed-Titel",
    label_embed_description: "Embed-Beschreibung",
    label_embed_color: "Embed-Farbe (Hex)",
    label_count: "Anzahl der Sendungen",
    label_file_upload: "Datei anhängen",
    label_schedule_time: "Sendezeit (HH:MM)",
    send_button: "Nachricht senden",
    status_sending: "Nachrichten werden gesendet...",
    status_success: "Nachrichten erfolgreich gesendet!",
    status_failed: "Nachricht konnte nicht gesendet werden.",
    status_fill_fields: "Bitte füllen Sie alle Felder korrekt aus."
  }
};

// 言語切り替え機能
function switchLanguage() {
  const language = document.getElementById('language').value;
  const elements = [
    "title", "label-language", "label-webhook", "label-message",
    "label-embed-title", "label-embed-description", "label-embed-color",
    "label-count", "label-file-upload", "label-schedule-time", "send-button"
  ];
  
  elements.forEach((id) => {
    document.getElementById(id).textContent = translations[language][id.replace('-', '_')];
  });
}

// テーマ切り替え機能
function toggleTheme() {
  document.body.classList.toggle('light');
  document.querySelector('.container').classList.toggle('light');
}

// メッセージ送信機能
async function sendMessage() {
  const webhookURL = document.getElementById('webhook').value;
  const message = document.getElementById('message').value;
  const count = parseInt(document.getElementById('count').value);
  const status = document.getElementById('status');

  const embedTitle = document.getElementById('embed-title').value;
  const embedDescription = document.getElementById('embed-description').value;
  const embedColor = document.getElementById('embed-color').value;
  const scheduleTime = document.getElementById('schedule-time').value;

  const language = document.getElementById('language').value;
  const fileInput = document.getElementById('file-upload').files[0];

  // 必須フィールドチェック
  if (!webhookURL || !message || !count || isNaN(count) || count < 1) {
    status.textContent = translations[language].status_fill_fields;
    status.style.color = "red";
    return;
  }

  status.textContent = translations[language].status_sending;
  status.style.color = "white";

  const delay = scheduleTime ? new Date(`${new Date().toDateString()} ${scheduleTime}`) - new Date() : 0;
  setTimeout(async () => {
    const embeds = [];
    if (embedTitle || embedDescription) {
      embeds.push({
        title: embedTitle,
        description: embedDescription,
        color: parseInt(embedColor.replace('#', ''), 16)
      });
    }

    for (let i = 0; i < count; i++) {
      const formData = new FormData();
      if (fileInput) formData.append("file", fileInput);

      const payload = {
        content: message,
        embeds: embeds.length > 0 ? embeds : undefined
      };

      formData.append("payload_json", JSON.stringify(payload));

      try {
        await fetch(webhookURL, {
          method: "POST",
          body: formData
        });
      } catch (error) {
        console.error("Failed to send message:", error);
        status.textContent = translations[language].status_failed;
        status.style.color = "red";
        return;
      }
    }

    status.textContent = translations[language].status_success;
    status.style.color = "green";
  }, delay);
}
