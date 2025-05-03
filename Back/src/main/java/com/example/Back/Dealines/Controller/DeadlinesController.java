package com.example.Back.Dealines.Controller;

import com.example.Back.Dealines.Model.Deadlines;
import com.example.Back.Dealines.Service.DeadlinesService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/deadlines")
public class DeadlinesController {

    private final DeadlinesService deadlinesService;

    @Autowired
    public DeadlinesController(DeadlinesService deadlinesService) {
        this.deadlinesService = deadlinesService;
    }

    @GetMapping
    public List<Deadlines> getAllDeadlines() {
        return deadlinesService.getDeadlines();
    }

    @GetMapping(path = "{id}")
    public Deadlines getDeadlinesById(@PathVariable("id") Long id) {
        return deadlinesService.getDeadlinesById(id);
    }

    @PostMapping
    public void addDeadlines(@RequestBody Deadlines deadlines) {
        deadlinesService.addDeadlines(deadlines);
    }

    @DeleteMapping(path = "{id}")
    public void deleteDeadlines(@PathVariable("id") Long id) {
        deadlinesService.deleteDeadlines(id);
    }

    @PutMapping(path = "{id}")
    public void updateDeadlines(@PathVariable("id") Long id, @Valid @RequestBody Deadlines deadlines) {
        deadlinesService.editDeadlines(id, deadlines);
    }
}
