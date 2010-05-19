// Blur Post process node.
// -------------------------------------------------------------------
// Copyright (C) 2010 OpenEngine.dk (See AUTHORS) 
// 
// This program is free software; It is covered by the GNU General 
// Public License version 2 or any later version. 
// See the GNU General Public License for more details (see LICENSE). 
//--------------------------------------------------------------------

#ifndef _BLUR_POST_PROCESS_NODE_H_
#define _BLUR_POST_PROCESS_NODE_H_

#include <Scene/PostProcessNode.h>

namespace OpenEngine {
    namespace Resources {
        
        class BlurPostProcessNode : public PostProcessNode {
        public:
            BlurPostProcessNode();

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
            void PreEffect(Renderers::IRenderer& renderer, Math::Matrix<4,4,float> modelview);

        };
        
    }
}

#endif
