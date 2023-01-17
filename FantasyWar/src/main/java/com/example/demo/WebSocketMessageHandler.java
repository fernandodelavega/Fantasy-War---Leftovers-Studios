package com.example.demo;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import jakarta.websocket.Session;





@Controller
public class WebSocketMessageHandler extends TextWebSocketHandler {
    
    @OnMessage
    public void handleMessage(Session session, String message) {
        // logic to handle the different types of messages
        ChatController.NewMessage(message);
    }
    
    public void sendMessage(Session session, String message) {
        session.getAsyncRemote().sendText(message);
    }
        
    
    
    //
    //@MessageMapping("/message")
    //@SendTo("/topic/messages")
    //public String handleMessage(String message) {
    //return message;
    //}
    //@OnOpen
    //public void onOpen(Session session) {
    //    // Handle session open event
    //}
    //
    //@OnClose
    //public void onClose(Session session) {
    //    // Handle session close event
    //}
    //
    //@OnError
    //public void onError(Session session, Throwable throwable) {
    //    // Handle session error event
    //}
    //
    //@OnMessage
    //public void onMessage(String message, Session session) {
    //    // Handle incoming message event
    //    ChatController.NewMessage(message);
    //}
    //
}//
