package com.example.backend.controller;

import com.example.backend.model.UserModel;
import com.example.backend.service.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins="http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/getall")
    public ResponseEntity<List<UserModel>> getAllData(){
        return ResponseEntity.ok(userService.getalldata());
    }

    @GetMapping("/getalluseronly")
    public ResponseEntity<List<UserModel>> getAllDataUser(){
        return ResponseEntity.ok(userService.getallUserdataOnly());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserModel> getUser(@PathVariable int userId) {
        UserModel user = userService.getUser(userId);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/loggedin")
    public UserModel getLoggedInUser() {
        return userService.findByIslogin();
    }

    @GetMapping("/isUserPresentByEmail")
    public boolean isUserPresentByEmail(@RequestParam String email) {
        return userService.isUserPresentByEmail(email);
    }
    
    @GetMapping("/isUserPresent/{email}/{password}")
    public ResponseEntity<UserModel> isUserPresent(@PathVariable String email,@PathVariable String password) {
        UserModel isPresent = userService.isUserPresent(email,password);
        return ResponseEntity.ok(isPresent);
    }

    @PostMapping("/addUser")
    public ResponseEntity<UserModel> addUser(@RequestBody UserModel user) {
        UserModel addedUser = userService.addUser(user);
        return ResponseEntity.ok(addedUser);
    }


    @PutMapping("/editUser/{userId}")
    public ResponseEntity<UserModel> editUser(@PathVariable int userId, @RequestBody UserModel user) {
        UserModel editedUser = userService.editUser(userId, user);
        return ResponseEntity.ok(editedUser);
    }

    @PutMapping("/updateLoginStatus/{userId}")
    public ResponseEntity<UserModel> updateLoginStatus(@PathVariable int userId, @RequestBody UserModel user) {
        UserModel updatedUser = userService.updateLoginStatus(userId, user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable int userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully.");
    }




  
}
