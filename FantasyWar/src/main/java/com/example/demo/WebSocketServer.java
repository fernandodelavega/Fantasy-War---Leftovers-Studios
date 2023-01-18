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

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws UnknownHostException {
    	
        // for(InetAddress l : localHost) {
    	// 	if(l == InetAddress.getLocalHost())
    	// 		return;
    	// }
    	// localHost.add(InetAddress.getLocalHost());
    	sessionsPerClient.add(session);
        sessions.add(session);
        if(sessionsPerClient.size() == 2){
            sessions.remove(session);
            sessionsPerClient = new CopyOnWriteArraySet<>();
        }
    	System.out.println(sessions);
    	
        System.out.println("Client connected: " + session.getId());
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        System.out.println("mensaje recivido");
        String[] response = {};
        System.out.println("Received message from client: " + message.getPayload());
        ObjectMapper mapper = new ObjectMapper();
        JsonObject json = new JsonObject();
        try {
            JsonNode node = mapper.readTree(message.getPayload());
            
            
            if(node.get("type").asText().equals("usuario1")){
            	System.out.println("Nuevo usuario");
                
            	if(userController.GetUser().length == 0) {
            		userController.NewUser(mapper.readTree(node.get("body").asText()).get("nombre").asText(), mapper.readTree(node.get("body").asText()).get("contra").asText());
                    json.addProperty("type","user");
                    json.addProperty("body", userController.GetUser()[0]);
            	}else {            		
            		for(int i = 1; i<userController.GetUser().length;i=i+3){
            			if(userController.GetUser()[i].equals(mapper.readTree(node.get("body").asText()).get("nombre").asText())){
            				System.out.println("Usuario ya en uso");
            			}else{
            				userController.NewUser(mapper.readTree(node.get("body").asText()).get("nombre").asText(),mapper.readTree(node.get("body").asText()).get("contra").asText());
            				json.addProperty("type","user");
            				json.addProperty("body", userController.GetUser()[i-1]);
            			}
            	}
                }

            
                
                // System.out.println("usuario");
                // String nombre=": ";
                // String val1 = ":";
                // String val2 = ",";
                // char act;
                // boolean encontrado = false;
                // String user = node.get("body").asText();
                // for(int i=0; i<user.length() ; i++){
                //     if(encontrado == true){
                //         if(user.charAt(i)==val2.charAt(0)){
                //             break;
                //         }
                //         act = user.charAt(i);
                //         nombre = nombre + act;
                //     }else if (user.charAt(i)==val1.charAt(0)){
                //         encontrado=true;
                //     }
                    

                // }
                
                // System.out.println("se ha iniciado sesion con el usuario"+ nombre);
            }else if(node.get("type").asText().equals("usuario2")){
                System.out.println("usuario");
                for(int i = 1; i<userController.GetUser().length;i=i+3){
                    if(userController.GetUser()[i].equals(mapper.readTree(node.get("body").asText()).get("nombre").asText())){
                        if(userController.GetUser()[i+1].equals(mapper.readTree(node.get("body").asText()).get("contra").asText())){
                           System.out.println("usuario coincide");
                           json.addProperty("type","user");
                           json.addProperty("body", userController.GetUser()[i-1]);
                        }else{System.out.println("contraseña incorrecto");}
                    }else{
                        System.out.println("usuario incorrecto");
                        
                    }
                }

                
                
                
            }
            else if(node.get("type").asText().equals("chat")){
            	System.out.println("dentro");
                chatController.NewMessage(node.get("body").asText());
                try {
                    response = chatController.GetMessage();


                    json.addProperty("type", "chat");
                    json.addProperty("body", response[response.length-1]);

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            else if(node.get("type").asText().equals("unidad")){
            	System.out.println("unidad nueva");
                json.addProperty("type", "unidad");
                json.addProperty("player", mapper.readTree(node.get("body").asText()).get("player").asText());
                json.addProperty("unidad", mapper.readTree(node.get("body").asText()).get("numUnidad").asText());
                json.addProperty("camino", mapper.readTree(node.get("body").asText()).get("road").asText());
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
