// Underwater Post process node.
// -------------------------------------------------------------------
// Copyright (C) 2010 OpenEngine.dk (See AUTHORS) 
// 
// This program is free software; It is covered by the GNU General 
// Public License version 2 or any later version. 
// See the GNU General Public License for more details (see LICENSE). 
//--------------------------------------------------------------------

#ifndef _UNDERWATER_POST_PROCESS_NODE_H_
#define _UNDERWATER_POST_PROCESS_NODE_H_

#include <Scene/PostProcessNode.h>

namespace OpenEngine {
    namespace Scene {
        
        class UnderwaterPostProcessNode : public PostProcessNode {
        public:
            UnderwaterPostProcessNode();

            UnderwaterPostProcessNode(Resources::IShaderResourcePtr effect, 
                                      Math::Vector<2, int> dims, 
                                      unsigned int colorBuffers = 1,
                                      bool useDepth = true);


            /**
             * Initialize effect specific settings, such as more
             * framebuffers or other variables.
             */
            void Initialize(Renderers::RenderingEventArg arg);

            /**
             * Handles any logic that needs to be done before the
             * effect, such as setting viewingvolume dependent
             * uniforms or updating time uniforms.
             */
            void PreEffect(Renderers::RenderingEventArg* arg, Math::Matrix<4,4,float>* modelview);

        };
        
    }
}

#endif
