package com.bouquetcake.orderservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bouquetcake.orderservice.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
