import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Helmet>
        <title>404</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="bg-[#e7e7e7]">
          <CardContent className="text-center p-8 space-y-6">
            <h3 className="text-gray-600 text-xl">
              Oops! Something went wrong.
            </h3>

            <div className="relative overflow-hidden rounded-lg">
              <img
                className="w-full h-[400px] object-cover"
                src="https://res.cloudinary.com/dmkgrwjes/image/upload/v1659285250/samples/ecommerce/1_EQisBuMOijQT8woW0Jn6pA_yz7n5r.jpg"
                alt="404 error"
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-gray-600 text-2xl">
                You can get back to our
              </h2>
              <Button
                asChild
                className="uppercase bg-gradient-to-r from-red-400 to-red-500 hover:opacity-90
                 transition-all shadow-lg shadow-red-500/30"
              >
                <Link to="/">Home Page</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
