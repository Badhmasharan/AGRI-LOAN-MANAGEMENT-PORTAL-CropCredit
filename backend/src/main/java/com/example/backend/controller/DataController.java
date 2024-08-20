package com.example.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.DataModel;
import com.example.backend.model.RepaymentModel;
import com.example.backend.service.DataService;

@RestController
@RequestMapping("/data")
@CrossOrigin(origins="http://localhost:3000")
public class DataController {

    @Autowired
    private DataService dataService;


    @GetMapping("/getall")
    public  ResponseEntity<List<DataModel>> GetAllData() {
        return ResponseEntity.ok(dataService.getData());
    }

    @GetMapping("/getallbyuser")
    public  ResponseEntity<List<DataModel>> GetAllDataByUser() {
        return ResponseEntity.ok(dataService.getDataByUserId());
    }

    @GetMapping("/getbyid/{id}")
    public DataModel getById(@PathVariable int id) {
        return dataService.getDataById(id);
    }


    @PostMapping("/post")
    public ResponseEntity<DataModel> postData(@RequestBody DataModel data) {
        System.out.println("Received data: " + data);
        DataModel savedData = dataService.postData(data);
        return ResponseEntity.ok(savedData);
    } 

    @PostMapping("/postall")
    public List<DataModel> postById(@RequestBody List<DataModel> data) {
        return dataService.postAllData(data);
    }


    @PostMapping("/postPayment/{id}")
    public DataModel postRepayment(@PathVariable int id,@RequestBody List<RepaymentModel> data) {
        return dataService.repaymentUpdate(id,data);
    }

    @DeleteMapping("/{dataId}")
    public ResponseEntity<String> deleteData(@PathVariable int dataId) {
        dataService.deleteData(dataId);
        return ResponseEntity.ok("Data deleted successfully.");
    }
    

    @PutMapping("/editDataLoanStatus/{dataId}/{newStatus}")
    public ResponseEntity<DataModel> editUser(@PathVariable int dataId, @PathVariable String newStatus) {
        DataModel editedUser = dataService.editData(dataId, newStatus);
        return ResponseEntity.ok(editedUser);
    }

    //  @PutMapping("/editDataRepaymentStatus/{dataId}/{schedule}")
    // public ResponseEntity<DataModel> editUserRepayment(@PathVariable int dataId, @PathVariable String schedule) {
    //     DataModel editedUser = dataService.editDataPayment(dataId, schedule);
    //     return ResponseEntity.ok(editedUser);
    // }

    @PostMapping("/chatbot/message")
    public String getResponse(@RequestBody String message) {

        String lowerMessage = message.toLowerCase();

        if (lowerMessage.contains("loan")) {
            return "We offer various agricultural loans. How can I assist you today?";
        } else if (lowerMessage.contains("apply") ) {
            return "To apply for an agricultural loan, please provide your details such as income, loan amount, etc.";
        } else if (lowerMessage.contains("hi") ) {
            return "Hi,How can i help you?";
        } else if (lowerMessage.contains("I want to cancel my loan") ) {
            return "Sure you can cancel your loan before it gets approved";
        } else {
            return "I'm not sure how to help with that. Can you please provide more details?";
        }
    }

}
