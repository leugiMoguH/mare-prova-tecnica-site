import{n as e}from"./rolldown-runtime-B0fFmPBj.js";import{n as t,t as n}from"./shaderStore-aBNeIjJY.js";var r,i,a;function o(){return(o=e((()=>{t(),r=`fogVertexDeclaration`,i=`#ifdef FOG
varying vFogDistance: vec3f;
#endif
`,n.IncludesShadersStoreWGSL[r]||(n.IncludesShadersStoreWGSL[r]=i),a={name:r,shader:i}})))()}var s,c,l;function u(){return(u=e((()=>{t(),s=`fogVertex`,c=`#ifdef FOG
#ifdef SCENE_UBO
vertexOutputs.vFogDistance=(scene.view*worldPos).xyz;
#else
vertexOutputs.vFogDistance=(uniforms.view*worldPos).xyz;
#endif
#endif
`,n.IncludesShadersStoreWGSL[s]||(n.IncludesShadersStoreWGSL[s]=c),l={name:s,shader:c}})))()}var d,f,p;function m(){return(m=e((()=>{t(),d=`vertexColorMixing`,f=`#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
vertexOutputs.vColor=vec4f(1.0);
#ifdef VERTEXCOLOR
#ifdef VERTEXALPHA
vertexOutputs.vColor*=colorUpdated;
#else
vertexOutputs.vColor=vec4f(vertexOutputs.vColor.rgb*colorUpdated.rgb,vertexOutputs.vColor.a);
#endif
#endif
#ifdef INSTANCESCOLOR
vertexOutputs.vColor*=vertexInputs.instanceColor;
#endif
#endif
`,n.IncludesShadersStoreWGSL[d]||(n.IncludesShadersStoreWGSL[d]=f),p={name:d,shader:f}})))()}export{a,u as i,p as n,o,l as r,m as t};