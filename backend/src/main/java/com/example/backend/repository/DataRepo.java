package com.example.backend.repository;

import com.example.backend.model.DataModel;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DataRepo extends JpaRepository<DataModel,Integer> {

    @Query("SELECT d FROM DataModel d WHERE d.user.islogin = 1")
    public List<DataModel> getByUserId();


}
