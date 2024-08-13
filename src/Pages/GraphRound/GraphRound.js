// GraphComponent.jsx
import React, { useEffect, useRef, useState } from "react";
import { LiteGraph, LGraph, LGraphCanvas } from "../../lib/litegraph.js"; // Adjust path
import './GraphRound.css'

function registerCustomNodes() {
  // Dataset Node
  function DatasetNode() {
    this.addOutput("source", "source");
    this.addOutput("annotation", "annotation");
  }
  DatasetNode.title = "Dataset";
  DatasetNode.prototype.onExecute = function() {
    // Simulate output, you might want to replace this with real data
    this.setOutputData(0, "source data");
    this.setOutputData(1, "annotation data");
  };
  LiteGraph.registerNodeType("utils/Dataset", DatasetNode);

  // Load_Obj Node
  function LoadObjNode() {
    this.addInput("source", "source");
    this.addOutput("mesh", "mesh");
    this.addOutput("normalmap", "normalmap");
  }
  LoadObjNode.title = "Load Obj";
  LoadObjNode.prototype.onExecute = function() {
    // Simulate processing and output
    const source = this.getInputData(0);
    this.setOutputData(0, "mesh data");
    this.setOutputData(1, "normalmap data");
  };
  LiteGraph.registerNodeType("utils/LoadObj", LoadObjNode);

  // Load_Anno Node
  function LoadAnnoNode() {
    this.addInput("annotation", "annotation");
    this.addOutput("text", "text");
    this.addOutput("class", "class");
  }
  LoadAnnoNode.title = "Load Anno";
  LoadAnnoNode.prototype.onExecute = function() {
    const annotation = this.getInputData(0);
    this.setOutputData(0, "text data");
    this.setOutputData(1, "class data");
  };
  LiteGraph.registerNodeType("utils/LoadAnno", LoadAnnoNode);

  // Extract CLIP Feature Node
  function ExtractCLIPFeatureNode() {
    this.addInput("text", "text");
    this.addOutput("clipfeat", "clipfeat");
  }
  ExtractCLIPFeatureNode.title = "Extract CLIP Feature";
  ExtractCLIPFeatureNode.prototype.onExecute = function() {
    const text = this.getInputData(0);
    this.setOutputData(0, "clip feature data");
  };
  LiteGraph.registerNodeType("utils/ExtractCLIPFeature", ExtractCLIPFeatureNode);

  // CreateTex Node
  function CreateTexNode() {
    this.addInput("clipfeat", "clipfeat");
    this.addInput("normalmap", "normalmap");
    this.addOutput("texture", "texture");
  }
  CreateTexNode.title = "CreateTex";
  CreateTexNode.prototype.onExecute = function() {
    const clipfeat = this.getInputData(0);
    const normalmap = this.getInputData(1);
    this.setOutputData(0, "texture data");
  };
  LiteGraph.registerNodeType("utils/CreateTex", CreateTexNode);

  // VisMeshlab Node
  function VisMeshlabNode() {
    this.addInput("mesh", "mesh");
    this.addInput("texture", "texture");
  }
  VisMeshlabNode.title = "VisMeshlab";
  VisMeshlabNode.prototype.onExecute = function() {
    const mesh = this.getInputData(0);
    const texture = this.getInputData(1);
    // Simulate visualization
    console.log("Visualizing mesh with texture");
  };
  LiteGraph.registerNodeType("utils/VisMeshlab", VisMeshlabNode);
}


const GraphComponent = () => { 
  const graphRef = useRef(null);

  useEffect(() => {
    registerCustomNodes();
    
     // Register custom nodes
     registerCustomNodes();

     // Create a new graph
     const graph = new LGraph();
 
     // Create a canvas and associate it with the graph
     const canvas = new LGraphCanvas(graphRef.current, graph);
 
     // Create and add nodes to the graph
     const datasetNode = LiteGraph.createNode("utils/Dataset");
     datasetNode.pos = [100, 100];
     graph.add(datasetNode);
 
     const loadObjNode = LiteGraph.createNode("utils/LoadObj");
     loadObjNode.pos = [300, 100];
     graph.add(loadObjNode);
 
     const loadAnnoNode = LiteGraph.createNode("utils/LoadAnno");
     loadAnnoNode.pos = [300, 300];
     graph.add(loadAnnoNode);
 
     const extractFeatureNode = LiteGraph.createNode("utils/ExtractCLIPFeature");
     extractFeatureNode.pos = [500, 300];
     graph.add(extractFeatureNode);
 
     const createTexNode = LiteGraph.createNode("utils/CreateTex");
     createTexNode.pos = [700, 100];
     graph.add(createTexNode);
 
     const visMeshlabNode = LiteGraph.createNode("utils/VisMeshlab");
     visMeshlabNode.pos = [900, 200];
     graph.add(visMeshlabNode);
 
     // Connect nodes
     datasetNode.connect(0, loadObjNode, 0);
     datasetNode.connect(1, loadAnnoNode, 0);
     loadObjNode.connect(0, createTexNode, 1);
     loadAnnoNode.connect(0, extractFeatureNode, 0);
     extractFeatureNode.connect(0, createTexNode, 0);
     createTexNode.connect(0, visMeshlabNode, 1);
     loadObjNode.connect(1, visMeshlabNode, 0);
 
     // Start running the graph
     graph.start();
 
     return () => {
       // Clean up
       graph.stop();
     };
   }, []);
 
   return (
     <div>
       <h2>Round</h2>
       <canvas
         ref={graphRef}
         width={2000}
         height={600}
         style={{ border: "1px solid black" }}
       ></canvas>
     </div>
   );
 };

export default GraphComponent;
