import { motion } from 'framer-motion';

const FloatingBoxes = () => {
  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      {/* Main Window */}
      <div style={{
        backgroundColor: '#e5e7eb',
        width: '500px',
        height: '350px',
        borderRadius: '10px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#d1d5db',
          padding: '8px',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px'
        }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#9ca3af' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#9ca3af' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#9ca3af' }}></span>
          </div>
          <div style={{ flexGrow: 1, textAlign: 'center', color: '#4b5563', fontSize: '14px' }}>pulse-template.com</div>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}>
          <img 
            alt="Template Preview" 
            loading="lazy" 
            width="800" 
            height="600" 
            decoding="async" 
            src="/placeholder.svg?height=600&width=800" 
            style={{ color: 'transparent', maxWidth: '100%', maxHeight: '100%' }}
          />
        </div>
      </div>
      
      {/* Floating Boxes */}
      <motion.div 
        style={{
          backgroundColor: '#e5e7eb',
          width: '80px',
          height: '80px',
          borderRadius: '10px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: '10%',
          right: '10%'
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        📷
      </motion.div>
      
      <motion.div 
        style={{
          backgroundColor: '#e5e7eb',
          width: '80px',
          height: '80px',
          borderRadius: '10px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: '10%',
          left: '10%'
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        📷
      </motion.div>
    </div>
  );
};

export default FloatingBoxes;
