package main

import (
	"fmt"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r* http.Request) bool {
		return true;
	},
}

var clients = struct {
	sync.RWMutex
	m map[string]*websocket.Conn
}{m: make(map[string]*websocket.Conn)}

func wsHandler(w http.ResponseWriter, r *http.Request) {
	userId := r.URL.Query().Get("userID")
	if userId == "" {
		http.Error(w, "userId required", http.StatusBadRequest)
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("upgrade error: ", err)
		return
	}

	clients.Lock()
	clients.m[userId] = conn
	clients.Unlock()
	fmt.Println("User connected: ", userId)

	defer func() {
		clients.Lock()
		delete(clients.m, userId)
		clients.Unlock()
		conn.Close()
		fmt.Println("user disconnected", userId)
	}()

	for {
		var msg struct {
			RecipientID string `json:"recipientID"`
			Message string `json:"message"`
		}

		err := conn.ReadJSON(&msg)
		if err != nil {
			fmt.Println("Read error: ", err)
		}
		clients.RLock()
		recipientConn, ok := clients.m[msg.RecipientID]
		clients.RUnlock()
	
		if ok {
			recipientConn.WriteJSON(map[string]string {
				"from": userId,
				"message": msg.Message,
			})
		}
	}

}

func main() {
	http.HandleFunc("/ws", wsHandler)
	fmt.Println("WEBSOCKETS RUNNING ON :8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println("server error: ", err)
	}
}