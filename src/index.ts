import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { EasingFunction, engine, Material, MeshCollider, MeshRenderer, Transform, Tween } from '@dcl/sdk/ecs'
import { setupUi } from './ui'

let wonLevel: boolean = false

export function getPlayerPosition() {
    const player = engine.PlayerEntity
    const playerPosition = Transform.get(player).position

    console.log('Player position:', playerPosition.x, playerPosition.y, playerPosition.z)
    return playerPosition
}

export function isLevelWon() {
    const playerY = getPlayerPosition().y
    if (playerY > 6)  {
        wonLevel = true
    } else {
        wonLevel = false
    }
    return wonLevel
}

export function main() {
    const box = engine.addEntity()

    Transform.create(box, {
        position: Vector3.create(5, 0.25, 5), 
        rotation:   Quaternion.create(0, 0, 0),
        scale: Vector3.create(2, 0.5, 2), // change to shape of the box
    })

    MeshRenderer.setBox(box)

    Material.setPbrMaterial(box, {
        albedoColor: Color4.Blue(),
        metallic: 1,
        roughness: 0.1,
    })

    MeshCollider.setBox(box)

    // Special type of system : Tween, its easir to define, 
    //it. only modified transform components.

    Tween.create(box, {
        duration: 15000,
        easingFunction: EasingFunction.EF_LINEAR,
        mode: Tween.Mode.Move({
            start: Vector3.create(5, 0.5, 5),
            end: Vector3.create(5, 6, 5),
        })
    })
    engine.addSystem(getPlayerPosition)
    engine.addSystem(isLevelWon)
    setupUi()

}

export var uiLevelWon: boolean = wonLevel