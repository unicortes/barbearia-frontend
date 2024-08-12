import * as React from "react"
import { FaCartPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const HomePage = () => {
  return (
    <div class="flex gap-6">
    <><><Card className="w-[250px]">
      <CardHeader>
        <CardTitle>Cadastrar Barbeiro</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button>Cadastrar</Button>
      </CardFooter>
    </Card><Card className="w-[250px]">
        <CardHeader>
          <CardTitle>Cadastrar serviço</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button>Cadastrar</Button>
        </CardFooter>
      </Card></><Card className="w-[250px]">
        <CardHeader>
          <CardTitle>Gerenciar estoque</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button>Gerenciar</Button>
        </CardFooter>
      </Card><Card className="w-[250px]">
        <CardHeader >
          <CardTitle> Cadastrar produto </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button>Cadastrar</Button>
        </CardFooter>
      </Card></>
      </div>
      
    
  )
}

export default HomePage;
