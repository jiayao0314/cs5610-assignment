package com.example.wbdvsp2102jiayaoserverjava.services;

import com.example.wbdvsp2102jiayaoserverjava.models.Widget;
import com.example.wbdvsp2102jiayaoserverjava.repositories.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WidgetService {

    @Autowired
    WidgetRepository repository;

    public Widget createWidgetForTopic(String topicId, Widget widget) {
        widget.setTopicId(topicId);
        return repository.save(widget);
    }

    public List<Widget> findAllWidgets() {
        // return (List<Widget>) repository.findAll();
        return repository.findAllWidgets();
    }

    public Widget findWidgetById(Long id) {
        // return repository.findById(id).get();
        return repository.findWidgetById(id);
    }

    public List<Widget> findWidgetsForTopic(String topicId) {
        return repository.findWidgetsForTopic(topicId);
    }

    public Integer deleteWidget(Long id) {
        if(repository.findById(id).isPresent()) {
            repository.deleteById(id);
            return 1;
        }
        return -1;
    }

    public Integer updateWidget(Long id, Widget widget) {
        if(repository.findById(id).isPresent()) {
            Widget originalWidget = repository.findById(id).get();
            originalWidget.setText(widget.getText());
            originalWidget.setSrc(widget.getSrc());
            originalWidget.setHeight(widget.getHeight());
            originalWidget.setWidth(widget.getWidth());
            originalWidget.setOrdered(widget.getOrdered());
            originalWidget.setType(widget.getType());
            originalWidget.setSize(widget.getSize());
            repository.save(originalWidget);
            return 1;
        }
        return -1;
    }
}
