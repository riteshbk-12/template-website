import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../screens/editor";
import { replace, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import html2canvas from "html2canvas"
import domtoimage from "dom-to-image"
import { motion } from "framer-motion";
import DraggableResizableDiv from "./draggableresizeablediv";
import ResizableDiv from "./draggableresizeablediv";


function OutputScreen({style,files}){
    const navigate=useNavigate();
    const [capture,setcapture]=useState(false);
     const context = useContext(Context);
    
    // Local state management
    const [localHtmlContent, setLocalHtmlContent] = useState({});
    const [localCssContent, setLocalCssContent] = useState({});
    const [localJsContent, setLocalJsContent] = useState({});
    const [localIsUpdated, setLocalIsUpdated] = useState(false);
    const [localClicked, setLocalClicked] = useState(false);
    
    // Use context if available, otherwise use local state
    const {
        htmlContent = localHtmlContent,
        setHtmlContent = setLocalHtmlContent,
        cssContent = localCssContent,
        setCssContent = setLocalCssContent,
        jsContent = localJsContent,
        setJsContent = setLocalJsContent,
        isupdated = localIsUpdated,
        clicked = localClicked,
        setclick = setLocalClicked,setImageData
    } = context || {};
    const location=useLocation();
    const {data}=location.state||{};
   
    
    const observerRef = useRef(null);
    const filelist = data || files;
    
    

    //if the content is not updated then the start value of the file will display through this
      useEffect(()=>{
        if (capture) {
          const ifrid=document.getElementById("outputFrame")
          
          const iframeDocument = ifrid.contentDocument || ifrid.contentWindow.document;
          if(ifrid.contentDocument?.body){
          console.log(iframeDocument.body)
          setTimeout(() => {
            html2canvas(iframeDocument.body,{useCORS: true,logging: true,}).then((canvas) => {
            const image1 = canvas.toDataURL('image/png');
            setImageData(image1); 
            console.log(image1)
            })
            .catch((error)=>{console.log("error occured while processing the image",error)})
            .finally(()=>{setcapture(false)})
          }, 200);
           
          }
          
          else{
            console.log("iframe is not loaded")
          }
         }
      
      },[capture])

      useEffect(() => {
        if (!isupdated) {
            const fileTypeMap = {
                js: "text/javascript",
                html: "text/html",
                css: "text/css",
                json: "application/json"
            };

            
            if (!filelist || filelist.length === 0) {
                console.warn("No files to process");
                return;
            }

            // Process each file and update corresponding state
            filelist.forEach(file => {
                const reader = new FileReader();
                
                reader.onload = function() {
                    const content = reader.result;
                    
                    // Match file type and update appropriate state
                    switch(file.type) {
                        case fileTypeMap.html:
                            setHtmlContent(prev => ({
                                ...prev,
                                [file.name]: content
                            }));
                            break;
                            
                        case fileTypeMap.css:
                            setCssContent(prev => ({
                                ...prev,
                                [file.name]: content
                            }));
                            break;
                            
                        case fileTypeMap.js:
                            setJsContent(prev => ({
                                ...prev,
                                [file.name]: content
                            }));
                            break;
                            
                        default:
                            console.warn(`Unhandled file type: ${file.type}`);
                    }
                };

                reader.onerror = function() {
                    console.error(`Error reading file: ${file.name}`);
                };

                try {
                    reader.readAsText(file);
                } catch (error) {
                    console.error(`Error starting file read: ${file.name}`, error);
                }
            });
        }
    }, [filelist, isupdated, setHtmlContent, setCssContent, setJsContent]);

    

    // useEffect(() => {
    //   return () => {
    //     if (observerRef.current) {
    //       observerRef.current.disconnect();
    //     }
    //   };
    // }, [clicked]);


    // Helper function to extract resources from HTML
const extractResources = (html, cssContent, jsContent) => {
  const extractFiles = (regex, content) => {
    const matches = [...html.matchAll(regex)];
    return matches
      .map(match => match[1].split('/').pop())
      .filter(filename => content[filename]);
  };

  return {
    cssFiles: extractFiles(
      /<link\s+[^>]*(?:href=["']([^"']+)["'][^>]*rel=["']?stylesheet["']?|rel=["']?stylesheet["']?[^>]*href=["']([^"']+)["'])[^>]*>/gi,
      cssContent
    ),
    jsFiles: extractFiles(
      /<script\s+[^>]*src=["']([^"']+)["'][^>]*>/gi,
      jsContent
    )
  };
};

// Helper function to set up image handling
const setupImageHandler = (doc, imageData) => {
  const imageMap = new Map();
  
  // Pre-process images into base64 - Make this synchronous
  const processImages = () => {
    return new Promise((resolve) => {
      let remaining = imageData.filter(file => file.type.startsWith('image/')).length;
      
      if (remaining === 0) resolve();

      imageData
        .filter(file => file.type.startsWith('image/'))
        .forEach(file => {
          const reader = new FileReader();
          reader.onload = () => {
            imageMap.set(file.name, reader.result);
            remaining--;
            if (remaining === 0) resolve();
          };
          reader.readAsDataURL(file);
        });
    });
  };

  // Helper to process image sources
  const processImageSrc = (node, src) => {
    if (!src) return;
    const imageName = src.split('/').pop();
    if (imageMap.has(imageName)) {
      node.src = imageMap.get(imageName);  // Use direct property assignment
    }
  };

  // Override Image constructor
  const OriginalImage = doc.defaultView.Image;
  doc.defaultView.Image = function(width, height) {
    const img = new OriginalImage(width, height);
    const originalDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
    
    Object.defineProperty(img, 'src', {
      set: function(value) {
        processImageSrc(img, value);
        if (originalDescriptor && originalDescriptor.set) {
          originalDescriptor.set.call(img, value);
        }
      },
      get: function() {
        if (originalDescriptor && originalDescriptor.get) {
          return originalDescriptor.get.call(img);
        }
        return null;
      }
    });
    return img;
  };
  doc.defaultView.Image.prototype = OriginalImage.prototype;

  // Create and return the observer
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeName === 'IMG') {
            processImageSrc(node, node.getAttribute('src'));
          }
        });
      }
      if (mutation.type === 'attributes' && 
          mutation.attributeName === 'src' && 
          mutation.target.nodeName === 'IMG') {
        processImageSrc(mutation.target, mutation.target.getAttribute('src'));
      }
    });
  });

  // Return an object with both the observer and the setup promise
  return {
    observer,
    setup: processImages()
  };
};

const setupNavigation = (doc, loadPageCallback) => {
  doc.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const newPage = link.getAttribute('href');
      if (newPage) {
        loadPageCallback(newPage);
      }
    });
  });
};


// Modified loadIframePage to handle the async image setup
const loadIframePage = async (page, { htmlContent, cssContent, jsContent, imageData, observerRef }) => {
  const iframe = document.getElementById('outputFrame');
  if (!iframe) return;

  const doc = iframe.contentDocument || iframe.contentWindow.document;
  
  // Clean up previous observer if it exists
  if (observerRef.current && observerRef.current.observer) {
    observerRef.current.observer.disconnect();
  }

  // Extract HTML and resources
  const imageupdatedhtml = await updateHtmlImagePaths(htmlContent[page],filelist );
  const html=imageupdatedhtml|| '<h1>Page Not Found</h1>'
  const { cssFiles, jsFiles } = extractResources(html, cssContent, jsContent);
  const cssStyles = cssFiles.map(file => cssContent[file]).join('\n');

  // Write the initial document
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${page}</title>
      <style>${cssStyles}</style>
    </head>
    <body>
      ${html}
      
    </body>
    </html>
  `);
  doc.close();


  jsFiles.forEach(jsFile => {
    if (jsContent[jsFile]) {
      const script = doc.createElement('script');
      script.textContent = jsContent[jsFile];
      script.defer = false;
      doc.body.appendChild(script);
    }
  });


  // Set up image handling and wait for images to be processed
  const imageHandler = setupImageHandler(doc, imageData);
  await imageHandler.setup;

  // Start observing after images are processed
  imageHandler.observer.observe(doc.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src']
  });
  observerRef.current = imageHandler;

  // Rest of the setup...
  setupNavigation(doc, (newPage) => {
    if (htmlContent[newPage]) {
      loadIframePage(newPage, { htmlContent, cssContent, jsContent, imageData, observerRef });
    } else {
      console.warn(`Page not found: ${newPage}`);
    }
  });

  
  console.log(doc)

  return doc;
};



      // async function loadiframeSinglePage(){
      //   setupdatedContent((prev)=>({
          
      //     updatedHtmlContent:htmlContent,
      //     updatedJsContent:jsContent,
      //     updatedCssContent:cssContent

      // }))
         
            // Update Image Paths
              // for (let key of Object.keys(htmlContent)) {
              //   updatedHtmlContent[key] = await updateHtmlImagePaths(htmlContent[key], data);
              // }
              // console.log()
              // for (let key of Object.keys(jsContent)) {
              //     updatedJsContent[key] = await updateJsImagePath(jsContent[key], data);
              // }

              // for(let key of Object.keys(cssContent)){
              //   updatedCssContent[key]=await updateCssImagePath(cssContent[key],data)
              // }
            

            // Inject CSS
            
      //   useEffect(()=>{
      //     const update =async()=>{
      //       let html=updatedContent.updatedHtmlContent
      //       let css=updatedContent.updatedCssContent
      //       let js=updatedContent.updatedJsContent
      //       let cssStyles=""
      //       let jsscripts=""
            
      //         console.log(html,css,js)
      //         html["index.html"]=await updateHtmlImagePaths(html["index.html"],data)

      //         let cssFiles = extractCssFilenames(html["index.html"], css);
      //         cssStyles = cssFiles.map(file => cssContent[file]).join("\n");
      //         //Inject js
              
               
      //         let jsFiles = extractJsFilenames(html["index.html"], js);
      //         const scriptElement = `<script>${jsFiles.map(file => js[file]).join("\n")}</script>`;
      //         // const bodyEndIndex = html["index.html"].indexOf('</body>');

      //         // if (bodyEndIndex !== -1) {
      //         //     html["index.html"] = html["index.html"].slice(0, bodyEndIndex) + scriptElement + html["index.html"].slice(bodyEndIndex);
      //         // }
            
              
             
            
            
            
          
            
      //   // setHtmlContent(updatedHtmlContent)
      //   // setJsContent(updatedJsContent)
      //       console.log(html["index.html"])
      //       // setHtmlContent(finalhtml); 

      //   if(updatedContent.updatedHtmlContent){
      //       const iframe = document.getElementById("outputFrame");
      //   if (iframe) {
      //     const doc = iframe.contentDocument || iframe.contentWindow.document;
      //     doc.open();
      //     // Write combined HTML, CSS, and JS into the iframe
      //     doc.write(`
      //       <!DOCTYPE html>
      //       <html lang="en">
      //       <head>
      //         <meta charset="UTF-8">
      //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
      //         <title>Output</title>
      //         <style>
      //            ${cssStyles}
      //         </style>
      //       </head>
      //       <body>
      //         ${html["index.html"]} <!-- Inject HTML -->

              
      //         <script>
      //         ${scriptElement}
      //           <!-- Inject JS -->
      //         </script>
      //       </body>
      //       </html>
      //     `);
      //     doc.close();
      // }}
      //     }
      //     update()
      //       },[updatedContent])

    // console.log(cssContent,jsContent,htmlContent)
    //to set the output of the files
    //to set images dynamically in the iframe
    function setupDynamicImageHandler(iframe, imageData) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      
      // Create a Map to store image data URLs
      const imageMap = new Map();
      imageData.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = () => {
            imageMap.set(file.name, reader.result);
          };
          reader.readAsDataURL(file);
        }
      });
      console.log(imageMap)
      

      // Helper function to process image src
      const processImageSrc = (node, src) => {
        if (!src) return;
        const imageName = src.split('/').pop();
        if (imageMap.has(imageName)) {
          console.log(imageName)
          node.setAttribute('src', imageMap.get(imageName));
        }
      };

      // Override the Image constructor
      const originalImage = doc.defaultView.Image;
      doc.defaultView.Image = function(width, height) {
        const img = new originalImage(width, height);
        
        // Override the src setter
        Object.defineProperty(img, 'src', {
          set: function(value) {
            processImageSrc(img, value);
          },
          get: function() {
            return img.getAttribute('src');
          }
        });
        
        return img;
      };

      // Create MutationObserver to watch for both new images and src changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          // Handle new nodes
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeName === 'IMG') {
                processImageSrc(node, node.getAttribute('src'));
              }
            });
          }
          
          // Handle attribute modifications
          if (mutation.type === 'attributes' && 
              mutation.attributeName === 'src' && 
              mutation.target.nodeName === 'IMG') {
            processImageSrc(mutation.target, mutation.target.getAttribute('src'));
          }
        });
      });

      // Start observing the document with attribute monitoring
      observer.observe(doc.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src']  // Only watch for src attribute changes
      });

      // Process any existing images in the document
      doc.querySelectorAll('img').forEach(img => {
        processImageSrc(img, img.getAttribute('src'));
      });

      observerRef.current = observer; // Store the observer reference
      return observer;
    }


    async function updateHTMLContent(htmlContent, cssContent, jsContent, data) {
  // Step 1: Process images in HTML
      const processedHTML = await updateHtmlImagePaths(htmlContent["index.html"], data);
      
      // Step 2: Extract and combine CSS
      const cssFiles = extractCssFilenames(processedHTML, cssContent)||[];
      const combinedCSS = cssFiles.map(file => cssContent[file]).join("\n");
      
      // Step 3: Extract and combine JS
      const jsFiles = extractJsFilenames(processedHTML, jsContent)||[];
      const combinedJS = jsFiles.map(file => jsContent[file]).join("\n");

      // Step 4: Setup code with safety check
      const setupCode = `
        if (!window._elementOverrideInitialized) {
          window._elementOverrideInitialized = true;
          const originalCreateElement = document.createElement.bind(document);
          document.createElement = function(tagName) {
            const element = originalCreateElement(tagName);
            if (tagName.toLowerCase() === 'img') {
              const originalSetAttribute = element.setAttribute.bind(element);
              const originalSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
              
              element.setAttribute = function(name, value) {
                if (name === 'src') {
                  originalSetAttribute(name, value);
                } else {
                  originalSetAttribute(name, value);
                }
              };

              Object.defineProperty(element, 'src', {
                get: function() {
                  return originalSrcDescriptor.get.call(this);
                },
                set: function(value) {
                  originalSrcDescriptor.set.call(this, value);
                }
              });
            }
            return element;
          };
        }
      `;
      
      // Step 5: Construct the final HTML
      return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Output</title>
          <style>
            ${combinedCSS}
          </style>
          <script>
            ${setupCode}
          </script>
        </head>
        <body>
          ${processedHTML}
          <script>
            ${combinedJS}
          </script>
        </body>
        </html>
      `;
    }

  async function updateHtmlImagePaths(html,data){
      let updatedhtml=html;
      const promises=data.map(element => {
        if(element.type.startsWith("image/")){
          // const newImageSrc = URL.createObjectURL(element); 
          // console.log(newImageSrc)
          return new Promise((resolve)=>{
            const imgRegex = /src=["']([^"']*)["']/g;
            const filereader=new FileReader()
            filereader.onload=()=>{
              let dataurl= filereader.result
              updatedhtml = updatedhtml.replace(imgRegex, (match, srcPath) => {
                if (srcPath.endsWith(element.name)) {
                  console.log(match,srcPath,element.name)
                  return `src="${dataurl}"`;
                }
                return match;
                })
                resolve();
            }
            filereader.readAsDataURL(element)
            })
        }
        Promise.resolve();
      });
      await Promise.all(promises);
      return updatedhtml
    }


  function extractCssFilenames(htmlString, cssContent) {
      const regex1 = /<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']?stylesheet["']?[^>]*>/gi;
      const regex2 = /<link\s+[^>]*rel=["']?stylesheet["']?[^>]*href=["']([^"']+)["'][^>]*>/gi;
      
      let match;
      const cssFiles = new Set(); // Using Set to avoid duplicates

      // Function to process matches
      function processMatches(regex) {
          while ((match = regex.exec(htmlString)) !== null) {
              let fileName = match[1].split('/').pop(); // Extract filename from path
              console.log(fileName);
              
              if (cssContent.hasOwnProperty(fileName)) { // Check existence in cssContent
                  cssFiles.add(fileName);
              }
          }
      }

      // Run both regex patterns
      processMatches(regex1);
      processMatches(regex2);
      
      const result = Array.from(cssFiles); // Convert Set to Array
      console.log(result);
      return result;
  }

  function extractJsFilenames(htmlString,jsContent) {
      const regex = /<script\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
      let match;
      const jsFiles = [];

      while ((match = regex.exec(htmlString)) !== null) {
          jsFiles.push(match[1].split('/').pop()); // Extract only the filename
      }

      console.log(jsFiles); // Debugging output
      return jsFiles;
  }

    useEffect(()=>{
      console.log(htmlContent,cssContent,jsContent)
      
      async function loadIframeSinglePage() {
        if(observerRef.current)
        {
          observerRef.current.disconnect();
        } 
      if (clicked || files) {
        
      try {
        // Generate the complete HTML
        const finalHTML = await updateHTMLContent(htmlContent, cssContent, jsContent, filelist );
        
        // Update the iframe
        const iframe = document.getElementById("outputFrame");
        if (iframe) {
          const doc = iframe.contentDocument || iframe.contentWindow.document;
          doc.open();
          doc.write(finalHTML);
          doc.close();
          console.log(doc)
          setTimeout(() => {
             setupDynamicImageHandler(iframe, filelist);
          }, 0);
          
        }
      } catch (error) {
        console.error("Error updating iframe:", error);
      }
    }
  }
      
      console.log("iframe is updating ")
      if(Object.keys(htmlContent).length>1){
        if(clicked){
          
        loadIframePage("index.html", {
        htmlContent,
        cssContent,
        jsContent,
        imageData: filelist,
        observerRef
      });
        }
      }
      else{
        loadIframeSinglePage()
      }
          
      console.log("iframe is updated")
      setclick(false)    
      
    },[htmlContent, cssContent, jsContent, clicked, ])
    
     // console.log(htmlContent,cssContent,jsContent)
      // const updated=async()=>{
      //    updatedHtmlContent= { ...htmlContent };
      //    updatedJsContent  = { ...jsContent };
      //    updatedCssContent = {...cssContent};
      //       // Update Image Paths

            

      //       // Inject CSS
      //       for (let key of Object.keys(updatedHtmlContent)) {
      //           let cssFiles = extractCssFilenames(updatedHtmlContent[key], updatedCssContent);
      //           const styleElement = `<style>${cssFiles.map(file => updatedCssContent[file]).join("\n")}</style>`;
      //           const headEndIndex = updatedHtmlContent[key].indexOf('</head>');

      //           if (headEndIndex !== -1) {
      //               updatedHtmlContent[key] = updatedHtmlContent[key].slice(0, headEndIndex) + styleElement + updatedHtmlContent[key].slice(headEndIndex);
      //           }
      //       }

      //       //Inject js
            // for (let key of Object.keys(updatedHtmlContent)) {
            //     let jsFiles = extractJsFilenames(updatedHtmlContent[key], updatedJsContent);
            //     const scriptElement = `<script>${jsFiles.map(file => updatedJsContent[file]).join("\n")}</script>`;
            //     const bodyEndIndex = updatedHtmlContent[key].indexOf('</body>');

            //     if (bodyEndIndex !== -1) {
            //         updatedHtmlContent[key] = updatedHtmlContent[key].slice(0, bodyEndIndex) + scriptElement + updatedHtmlContent[key].slice(bodyEndIndex);
            //     }
            // }
            
          
      //   // setHtmlContent(updatedHtmlContent)
      //   // setJsContent(updatedJsContent)
      // console.log(updatedHtmlContent["index.html"])
      //       // setHtmlContent(finalhtml); 

      //   if(clicked){
      //       const iframe = document.getElementById("outputFrame");
      //   if (iframe) {
      //     const doc = iframe.contentDocument || iframe.contentWindow.document;
      //     doc.open();
      //     // Write combined HTML, CSS, and JS into the iframe
      //     doc.write(`
      //       <!DOCTYPE html>
      //       <html lang="en">
      //       <head>
      //         <meta charset="UTF-8">
      //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
      //         <title>Output</title>
      //         <style>
      //            /* Injected CSS */
      //         </style>
      //       </head>
      //       <body>
      //         ${updatedHtmlContent["index.html"]} <!-- Inject HTML -->

              
      //         // <script>
      //         // 
      //         //   <!-- Inject JS -->
      //         // </script>
      //       </body>
      //       </html>
      //     `);
      //     doc.close(); // Close the document after writing
      //   }
      //   }
      // }
    // useEffect(()=>{
    //   const update=async()=>{
              // for (let key of Object.keys(htmlContent)) {
              //   updatedHtmlContent[key] = await updateHtmlImagePaths(htmlContent[key], data);
              // }
              // console.log()
              // for (let key of Object.keys(jsContent)) {
              //     updatedJsContent[key] = await updateJsImagePath(jsContent[key], data);
              // }

              // for(let key of Object.keys(cssContent)){
              //   updatedCssContent[key]=await updateCssImagePath(cssContent[key],data)
              // }}
    //           update()
    // },[updatedCssContent,updatedHtmlContent,updatedJsContent])

    
     
    
    return(
      <>
        
        <motion.div whileHover={"hover"}  
        style={{
          ...style,
          
          
          right:0,
        }} >
            
        
         
            <motion.iframe style={{ height: "100%", width: "100%",objectFit: "cover" }} id="outputFrame"></motion.iframe>
            <motion.button variants={{hover:{opacity:1}}} style={{marginLeft:"80%",borderRadius:10,height:40,zIndex:1,top:"0%",position:"absolute",left:"-35%",opacity:0}} onClick={()=>{capture?setcapture(false):setcapture(true)}}>capture</motion.button>

            {/* {image?<div style={{height:500,width:500}}><img style={{height:500,width:500}} src={image}></img></div>:null} */}
          </motion.div>
        
      </>
    );
}
export default OutputScreen;
