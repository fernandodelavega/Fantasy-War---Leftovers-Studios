package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;

import jakarta.websocket.Session;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;


@Controller
public class WebSocketServer extends TextWebSocketHandler{
	private static Set<WebSocketSession> sessions = new CopyOnWriteArraySet<>();
	private static Set<WebSocketSession> sessionsPerClient = new CopyOnWriteArraySet<>();

	// private static Set<InetAddress> localHost = new CopyOnWriteArraySet<>();
    ChatController chatController = new ChatController();
    UserController userController = new UserController();
    
    Player player1 = new Player();
    Player player2 = new Player();
    
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws UnknownHostException {
    	
        // for(InetAddress l : localHost) {
    	// 	if(l == InetAddress.getLocalHost())
    	// 		return;
    	// }
    	// localHost.add(InetAddress.getLocalHost());
        sessions.add(session);
    	sessionsPerClient.add(session);
        if(sessionsPerClient.size() == 2){
            sessions.remove(session);
            sessionsPerClient = new CopyOnWriteArraySet<>();
        }
    	System.out.println(sessions);
    	
        System.out.println("Client connected: " + session.getId());
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        System.out.println("mensaje recibido");
        String[] chat = {};
        String[] response = new String[4];
        System.out.println("Received message from client: " + message.getPayload());
        ObjectMapper mapper = new ObjectMapper();
        JsonObject json = new JsonObject();
        try {
            JsonNode node = mapper.readTree(message.getPayload());
            String newId = new String();
            
            if(node.get("type").asText().equals("usuario1")){
            	System.out.println("Nuevo usuario");
            	
                
            	System.out.println(userController.GetUser().length);
            	if(userController.GetUser().length == 0) {
            		userController.NewUser(mapper.readTree(node.get("body").asText()).get("nombre").asText(), mapper.readTree(node.get("body").asText()).get("contra").asText());
                    //json.addProperty("type","user");
                    //json.addProperty("body", userController.GetUser()[0]);
            		
            		newId = userController.GetUser()[0];
                    if(player1.getName() == null) {
                    	player1 = new Player(mapper.readTree(node.get("body").asText()).get("nombre").asText(), newId);
                    }
                    else if(player2.getName() == null){
                    	player2 = new Player(mapper.readTree(node.get("body").asText()).get("nombre").asText(), newId);
                    }
            	}else {            		
            		for(int i = 1; i<userController.GetUser().length;i=i+3){
            			if(userController.GetUser()[i].equals(mapper.readTree(node.get("body").asText()).get("nombre").asText())){
            				System.out.println("Usuario ya en uso");
            			}else{
            				userController.NewUser(mapper.readTree(node.get("body").asText()).get("nombre").asText(),mapper.readTree(node.get("body").asText()).get("contra").asText());
            				i+=3;
            				newId = userController.GetUser()[i-1];
            				//json.addProperty("type","user");
            				//json.addProperty("body", userController.GetUser()[i-1]);
            				if(player1.getName() == null) {
                            	player1 = new Player(mapper.readTree(node.get("body").asText()).get("nombre").asText(), newId);
                            }
                            else if(player2.getName() == null){
                            	player2 = new Player(mapper.readTree(node.get("body").asText()).get("nombre").asText(), newId);
                            }
            			}
            		}
                }
            	
            	json.addProperty("type","user");
                json.add("player1", player1.GetPlayer());
                json.add("player2", player2.GetPlayer());
                json.addProperty("newId", newId);
                
                
            }else if(node.get("type").asText().equals("usuario2")){
                System.out.println("usuario");
                for(int i = 1; i<userController.GetUser().length;i=i+3){
                    if(userController.GetUser()[i].equals(mapper.readTree(node.get("body").asText()).get("nombre").asText())){
                        if(userController.GetUser()[i+1].equals(mapper.readTree(node.get("body").asText()).get("contra").asText())){
                        	newId = userController.GetUser()[i-1];
                        	if(player1.getName() == null) {
                        		player1 = new Player(mapper.readTree(node.get("body").asText()).get("nombre").asText(), newId);
                        	}
                        	else if(player2.getName() == null && !player1.getID().equals(userController.GetUser()[i-1]) ){
                        		player2 = new Player(mapper.readTree(node.get("body").asText()).get("nombre").asText(), newId);
                        	}
                        	json.addProperty("type","user");
                        	json.add("player1", player1.GetPlayer());
                        	json.add("player2", player2.GetPlayer());
                        	json.addProperty("newId", newId);
                        }
                    }else{
                        System.out.println("usuario incorrecto");
                        
                    }
                }

                
                
                
            }
            else if(node.get("type").asText().equals("chat")){
            	System.out.println("dentro");
                chatController.NewMessage(node.get("body").asText());
                try {
                    chat = chatController.GetMessage();

                    json.addProperty("type", "chat");
                    json.addProperty("message1", chat[chat.length - 1]);
                    json.addProperty("message2", (chat.length > 1)? chat[chat.length - 2] : "");
                    json.addProperty("message3", (chat.length > 2)?chat[chat.length - 3] : "");
                    json.addProperty("message4", (chat.length > 3)?chat[chat.length - 4] : "");

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            else if(node.get("type").asText().equals("unidad")){
            	//System.out.println("unidad nueva");
                json.addProperty("type", "unidad");
                json.addProperty("player", mapper.readTree(node.get("body").asText()).get("player").asText());
                json.addProperty("unidad", mapper.readTree(node.get("body").asText()).get("numUnidad").asText());
                json.addProperty("camino", mapper.readTree(node.get("body").asText()).get("road").asText());
            }
            else if(node.get("type").asText().equals("oro")){
                System.out.print("oro" + node);
                json.addProperty("type", "oro");
                json.addProperty("player", mapper.readTree(node.get("body").asText()).get("player").asText());
                json.addProperty("cantidad", mapper.readTree(node.get("body").asText()).get("oro").asInt());
            }
            else if(node.get("type").asText().equals("muerteUnidad")){
                json.addProperty("type", "muerteUnidad");
                json.addProperty("playerNumber", mapper.readTree(node.get("body").asText()).get("player").asText());
                json.addProperty("arrayPos", mapper.readTree(node.get("body").asText()).get("position").asText());
            }
            else if(node.get("type").asText().equals("userReady")) {
            	if(player1.getID().equals(mapper.readTree(node.get("body").asText()).get("playerID").asText())) {
            		player1.SetReady(mapper.readTree(node.get("body").asText()).get("readyStatus").asBoolean());
            	}
            	else if(player2.getID().equals(mapper.readTree(node.get("body").asText()).get("playerID").asText())) {
            		player2.SetReady(mapper.readTree(node.get("body").asText()).get("readyStatus").asBoolean());
            	}
            	json.addProperty("type","user");
                json.add("player1", player1.GetPlayer());
                json.add("player2", player2.GetPlayer());
            }
            else if(node.get("type").asText().equals("reset")) {
            	player1 = new Player();
            	player2 = new Player();
            	json.addProperty("type", "winner");
            	json.addProperty("winnerID", node.get("body").asText());
            }
            else {
            	System.out.println("fuera");
            }
            try {
                handleTextMessage((WebSocketSession)session, (CharSequence) json.toString());
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        } catch (JsonMappingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
    
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    	sessions.remove(session);
        System.out.println("Client disconnected: " + session.getId());
        
    }

    protected void handleTextMessage(WebSocketSession session,CharSequence message) throws Exception {
    	for(WebSocketSession s : sessions) {
    		if(s.isOpen()) {
    			s.sendMessage(new TextMessage(message));
    		}
    	}
    }
}
