import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { EasingFunction, engine, Material, MeshCollider, MeshRenderer, pointerEventsSystem, Transform, Tween, tweenSystem } from '@dcl/sdk/ecs'
import { getTriggerEvents, getActionEvents } from '@dcl/asset-packs/dist/events'
import { TriggerType } from '@dcl/asset-packs'
import { setupUi } from './ui'

let gameWon: boolean = false

function getPlayerY() {
    const playerY = Transform.get(engine.PlayerEntity).position.y

    return playerY
}

export function isGameWon() {
    const playerY = getPlayerY()

    if (playerY > 14) {
        gameWon = true
        console.log(gameWon)
    }
    return gameWon
}

export function main() {
    const box = engine.addEntity()

    Transform.create(box, {
        position: Vector3.create(1, 0.5, 1),
        scale: Vector3.create(2, 0.5, 2),
    })

    MeshRenderer.setBox(box)

    MeshCollider.setBox(box)

    const button = engine.getEntityOrNullByName("button")

    if (button) {
        const triggerEvents = getTriggerEvents(button)
        triggerEvents.on(TriggerType.ON_CLICK, () => {

            Tween.create(box, {
                duration: 30000,
                easingFunction: EasingFunction.EF_LINEAR,
                mode: Tween.Mode.Move({
                    start: Vector3.create(1, 0.5, 1),
                    end: Vector3.create(15, 15, 15)
                })
            })
        })
    }

    engine.addSystem(isGameWon)
    
    setupUi()
}
