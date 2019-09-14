package cz.cvut.kbss.datatools.xmlanalysis.partners.csat.model;

import javax.xml.bind.annotation.*;
import java.util.List;


@XmlRootElement(name = "WorkflowProcess")
@XmlAccessorType(value = XmlAccessType.FIELD)
public class WorkflowProcess implements BaseEntity {

    @XmlID
    @XmlAttribute(name = "Id")
    protected String id;
    @XmlAttribute(name = "Name")
    protected String name;
    @XmlElementWrapper(name = "Activities")
    @XmlElement(name = "Activity")
    protected List<Activity> activities;

    @XmlElementWrapper(name = "Transitions")
    @XmlElement(name = "Transition")
    protected List<Transition> transitions;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }

    public List<Transition> getTransitions() {
        return transitions;
    }

    public void setTransitions(List<Transition> transitions) {
        this.transitions = transitions;
    }

    @Override
    public String toString() {
        return "WorkflowProcess{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", activities=" + activities +
                ", transitions=" + transitions +
                '}';
    }
}
