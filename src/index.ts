import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { EasingFunction, engine, Material, MeshCollider, MeshRenderer, pointerEventsSystem, Transform, Tween, tweenSystem } from '@dcl/sdk/ecs'

let gameFinished: boolean = false


function getPlayerY() {
    const player = engine.PlayerEntity
    const playerTransform = Transform.get(player)
    const playerY = playerTransform.position.y

    console.log(String(playerY))
    return playerY
}

function updateGameStatus() {
    const playerY = getPlayerY()

    if (playerY > 14) {
        gameFinished = true
    }
}

export function main() {

    const box = engine.addEntity()

    Transform.create(box, {
        position: Vector3.create(1, 0.5, 1), 
        rotation: Quaternion.create(0, 0, 0),
        scale: Vector3.create(2, 0.25, 2),
    })

    MeshRenderer.setBox(box)

    MeshCollider.setBox(box)

    Material.setPbrMaterial(box, {
        albedoColor: Color4.Yellow(),
        metallic: 0.7, 
        roughness: 0.1,
    })

    const button = engine.getEntityOrNullByName('button')

    if (button) {
        pointerEventsSystem.onPointerDown(
            {
                entity: button,
                opts: {
                    hoverText: "click!"
                }
            },
            function () {
    
                Tween.create(box, {
                    duration: 30000,
                    easingFunction: EasingFunction.EF_LINEAR,
                    mode: Tween.Mode.Move({
                        start: Vector3.create(1, 0.5, 1),
                        end: Vector3.create(15, 15, 15),
                    })
                })
    
            }
        )
    }

    engine.addSystem(updateGameStatus)
}
