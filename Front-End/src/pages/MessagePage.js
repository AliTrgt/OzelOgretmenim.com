// import React, { useEffect, useState, useRef } from 'react';
// import io from 'socket.io-client';
// import styles from './MessagePage.module.css';

// const socket = io('http://localhost:5000'); // Backend URL'inizi buraya yazın

// export const MessagePage = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [username, setUsername] = useState('');
//   const [isUsernameSet, setIsUsernameSet] = useState(false);
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (!isUsernameSet) {
//       const usernamePrompt = prompt('Lütfen kullanıcı adınızı giriniz:');
//       if (usernamePrompt) {
//         setUsername(usernamePrompt);
//         setIsUsernameSet(true);
//       }
//     }

//     // Gelen mesajları dinlemek
//     socket.on('receiveMessage', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socket.off('receiveMessage');
//     };
//   }, [isUsernameSet]);

//   const sendMessage = () => {
//     if (inputMessage.trim()) {
//       const message = {
//         username,
//         text: inputMessage,
//       };
//       socket.emit('sendMessage', message);
//       setMessages((prevMessages) => [...prevMessages, message]);
//       setInputMessage('');
//     }
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.style.height = 'auto';
//       inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
//     }
//   }, [inputMessage]);

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       sendMessage();
//     }
//   };

//   if (!isUsernameSet) {
//     return null; // Kullanıcı adı belirlenmemişse bileşeni gösterme
//   }

//   return (
//     <div className={styles.container}>
//       <button className={styles.backButton} onClick={() => window.history.back()}>Geri Dön</button>
//       <div className={styles.chatBox}>
//         <div className={styles.messages}>
//           {messages.map((message, index) => (
//             <div key={index} className={styles.message}>
//               <span className={styles.username}>{message.username}:</span>
//               <span className={styles.text}>{message.text}</span>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>
//         <div className={styles.inputContainer}>
//           <textarea
//             className={styles.input}
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder="Mesajınızı yazın..."
//             rows={1}
//             ref={inputRef}
//           />
//           <button className={styles.button} onClick={sendMessage}>Gönder</button>
//         </div>
//       </div>
//     </div>
//   );
// };
