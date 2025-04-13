import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { EasingFunction, engine, Material, MeshCollider, MeshRenderer, Transform, Tween } from '@dcl/sdk/ecs'
import { setupUi } from './ui'

let levelWon: boolean = false

export function isGameWon() {
    const playerY = Transform.get(engine.PlayerEntity).position.y

    if (playerY > 5) {
        levelWon = true
        console.log(String(levelWon))
    }
    return levelWon
}

export function main() {
    const box = engine.addEntity()

    Transform.create(box, {
        position: Vector3.create(5, 0.25, 5),
        rotation: Quaternion.create(0, 0, 0),
        scale: Vector3.create(2, 0.5, 2)
    })

    MeshRenderer.setBox(box)

    MeshCollider.setBox(box)

    Material.setPbrMaterial(box, {
        albedoColor: Color4.Yellow(),
        metallic: 0.8, 
        roughness: 0.1,
    })

    Tween.create(box, {
        duration: 10000,
        easingFunction: EasingFunction.EF_LINEAR,
        mode: Tween.Mode.Move({
            start: Vector3.create(5, 0.25, 5),
            end: Vector3.create(7, 5, 7)
        })
    })

    engine.addSystem(isGameWon)
    setupUi()
}
