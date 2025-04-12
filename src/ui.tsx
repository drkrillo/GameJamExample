import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { isLevelWon, uiLevelWon } from '.'

const uiComponent = () => [
    UIModule1(),
  ]

export function setupUi() {
    ReactEcsRenderer.setUiRenderer(uiComponent)
  }
    
  // file for UI module 1
  
  export function UIModule1() {
    return (
      <UiEntity
        uiTransform={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          positionType: 'absolute',
          position: { right: '50%', bottom: '90%' },
        }}
      >
        <Label value={String(isLevelWon())} fontSize={28} textAlign="middle-center" />
      </UiEntity>
    )
  }
  
  