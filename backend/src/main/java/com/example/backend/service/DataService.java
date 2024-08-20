package com.example.backend.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.model.DataModel;
import com.example.backend.model.RepaymentModel;
import com.example.backend.model.UserModel;
import com.example.backend.repository.DataRepo;
import com.example.backend.repository.UserRepo;

@Service
public class DataService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private DataRepo dataRepo;

    public List<DataModel> getData(){
        return dataRepo.findAll();
    }

    public DataModel getDataById(int id){
        return dataRepo.findById(id).orElseThrow(()->new Error("Not Found"));
    }

    public List<DataModel> getDataByUserId(){
        return dataRepo.getByUserId();
    }


    public List<DataModel> postAllData(List<DataModel> data){
        return dataRepo.saveAll(data);
    }

    public DataModel repaymentUpdate(int id, List<RepaymentModel> data) {
            DataModel newdata = getDataById(id);
            newdata.setRepaymentModels(data);
            return dataRepo.save(newdata);

    }
    
    public DataModel postData(DataModel dataModel) {
            UserModel user = userRepo.findById(dataModel.getUser().getUserId())
            .orElseThrow(() -> new Error("User not found"));
            dataModel.setUser(user);
            return dataRepo.save(dataModel);

    }


    public void deleteData(int dataId) {
        dataRepo.deleteById(dataId);
    }

    public DataModel editData(int dataId, String newStatus) {
        DataModel data = dataRepo.findById(dataId).orElseThrow(() -> new Error("Not Found"));
        data.setLoanStatus(newStatus);
        // data.setRepaymentDate(user.getRepaymentDate());
        return dataRepo.save(data);
    }

    // public DataModel editDataPayment(int dataId, String newStatus) {
    //     DataModel data = dataRepo.findById(dataId).orElseThrow(() -> new Error("Not Found"));
    //     // data.setLoanStatus(newStatus);
    //     data.setRepaymentDate(newStatus);
    //     return dataRepo.save(data);
    // }

}
