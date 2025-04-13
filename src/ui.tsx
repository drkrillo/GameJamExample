import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { isGameWon } from '.'

const uiComponent = () => [
    UIModule1(),
    UIModule2(),
  ]

export function setupUi() {
    ReactEcsRenderer.setUiRenderer(uiComponent)
  }
    
  // file for UI module 1
  
  export function UIModule1() {
    return (
      <UiEntity
        uiTransform={{
          positionType: 'absolute',
          position: { right: '50%', top: '10%' },
        }}
      >
        <Label 
            value={String(isGameWon())} 
            fontSize={28} 
            textAlign="middle-center"
         />
      </UiEntity>
    )
  }
  
  export function UIModule2() {
    return (
      <UiEntity
        uiTransform={{
          positionType: 'absolute',
          position: { right: '50%', bottom: '3%' },
        }}
      >
        <Label
          value="Here's some more UI!"
          fontSize={25}
          textAlign="middle-center"
        />
      </UiEntity>
    )
  }
  