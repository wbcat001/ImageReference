
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";





const useFadeTransition = (duration = 0.5) => {
    return {
      as: motion.div,
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration }
    };
  };


interface TransitionPageWrapper{
    children: ReactNode
}

export const  TransitionPageWrapper: React.FC<TransitionPageWrapper> = ({children})  => {

    const fadeTransitionProps = useFadeTransition(0.5)

    return (
        <motion.div 
       {...fadeTransitionProps}
      >
            {children}
        </motion.div>
    )
}