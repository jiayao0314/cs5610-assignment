package com.example.wbdvsp2102jiayaoserverjava.services;

import com.example.wbdvsp2102jiayaoserverjava.models.Widget;
import com.example.wbdvsp2102jiayaoserverjava.repositories.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WidgetService {

//    private List<Widget> widgets = new ArrayList<Widget>();
//    {}
//    // implement crud operations
//    public Widget createWidgetForTopic(String topicId, Widget widget) {
//        Long id = (new Date()).getTime();
//        widget.setId(id);
//        widgets.add(widget);
//        return widget;
//    }
//    public List<Widget> findAllWidgets() {
//        return widgets;
//    }
//    public List<Widget> findWidgetsForTopic(String topicId) {
//        List<Widget> ws = new ArrayList<Widget>();
//        if(widgets != null){
//            for (Widget w : widgets) {
//                if (w.getTopicId().equals(topicId)) {
//                    ws.add(w);
//                }
//            }
//        }
//        return ws;
//    }
//    public Widget findWidgetById(Long id) {
//        for(Widget w: widgets) {
//            if(w.getId().equals(id)) {
//                return w;
//            }
//        }
//        return null;
//    }
//    public Integer updateWidget(Long id, Widget newWidget) {
//        for(int i=0; i<widgets.size(); i++) {
//            if(widgets.get(i).getId().equals(id)) {
//                widgets.set(i, newWidget);
//                return 1;
//            }
//        }
//        return -1;
//    }
//    public Integer deleteWidget(Long id) {
//        int index = -1;
//        for(int i=0; i<widgets.size(); i++) {
//            if(widgets.get(i).getId().equals(id)) {
//                widgets.remove(index);
//                return 1;
//            }
//        }
//        return -1;
//    }


    @Autowired
    WidgetRepository repository;

    public Widget createWidgetForTopic(String topicId, Widget widget) {
        widget.setTopicId(topicId);
        return repository.save(widget);
    }

    public List<Widget> findAllWidgets() {
        return (List<Widget>) repository.findAll();
    }

    public Widget findWidgetById(Long id) {
        return repository.findById(id).get();
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
            // get();
            // TODO: copy all the other fields testing for null
            originalWidget.setText(widget.getText());
            repository.save(originalWidget);
            return 1;
        }
        return -1;
    }
}
