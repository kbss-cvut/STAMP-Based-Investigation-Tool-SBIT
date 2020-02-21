package cz.cvut.kbss.datatools.xmlanalysis.partners;

import cz.cvut.kbss.datatools.xmlanalysis.partners.csat.ProcessBisagiBPMFile;
import cz.cvut.kbss.datatools.xmlanalysis.partners.graphml.BPM2GraphmlRenderer;
import org.apache.jena.system.JenaSystem;

public class MainConverter {
    public static void main(String[] args) {
        String from = null;
        String to = null;
        if(args.length == 0) {
            System.out.println("arguments:");
            System.out.println("from - it will save the output in a file in the working directory. Existing files with the name of \"from\" with the extension rdf.");
            System.out.println("from to - it will save the output in file \"to\". Existing file will be replaced.");
            return;
        }

        if(args.length > 0){
            from = args[0];
        }

        if(args.length > 1){
            to = args[1];
        }
        ProcessBisagiBPMFile p = new ProcessBisagiBPMFile();
        p.processFile(from, to);


        System.out.println("Rendering flow and structure gml diagrams ...");
        BPM2GraphmlRenderer.utilityRenderFlowAndStructrue(p.getOutputFile().getAbsolutePath());
    }
}
