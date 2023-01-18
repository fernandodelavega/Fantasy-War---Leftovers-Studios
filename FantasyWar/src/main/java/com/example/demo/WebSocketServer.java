package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;

import java.io.IOException;
import java.util.Arrays;


@Controller
public class WebSocketServer extends TextWebSocketHandler{
    ChatController chatController = new ChatController();
    UserController userController = new UserController();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
    	
        System.out.println("Client connected: " + session.getId());
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        System.out.println("mensaje recivido");
        String[] response = {};
        System.out.println("Received message from client: " + message.getPayload());
        ObjectMapper mapper = new ObjectMapper();
        JsonObject json = new JsonObject();
        try {
            JsonNode node = mapper.readTree(message.getPayload());
            System.out.println(node.get("type").asText());
            if(node.get("type").asText().equals("usuario1")){
                
                for(int i = 1; i<userController.GetUser().length;i=i+3){
                    if(userController.GetUser()[i].equals(node.get("body").get("nombre").asText())){
                        System.out.println("Usuario ya en uso");
                    }else{
                        userController.NewUser(node.get("body").get("nombre").asText(),node.get("body").get("contra").asText())
                        json.addProperty("type":"user");
                        json.addProperty("body": userController.GetUser()[i-1]);
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
                    if(userController.GetUser()[i].equals(node.get("body").get("nombre").asText())){
                        if(userController.GetUser()[i+1].equals(node.get("body").get("contra").asText())){
                           System.out.println("usuario coincide");
                           json.addProperty("type":"user");
                           json.addProperty("body": userController.GetUser()[i-1]);
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


    public void afterConnectionClossed(WebSocketSession session) {
        System.out.println("Client disconnected: " + session.getId());
    }

    protected void handleTextMessage(WebSocketSession session,CharSequence message) throws Exception {

        session.sendMessage(new TextMessage(message));
    }
}
